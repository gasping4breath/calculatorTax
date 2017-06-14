import React from 'react';
import uuid from 'uuid';
import CalculatorDto from '../dto/CalculatorDto';
import CalculatorList from '../component/CalculatorList';
import CurrencyService from '../service/CurrencyService';
import CalculatorService from '../service/CalculatorService';

class CalculatorListContainer extends React.Component {
    state = {
        calculatorList: [],
        currencyList: [],
        _currencyListIsReady: false
    };

    componentWillMount = async() => {
        this.setState({
            calculatorList: CalculatorService.getCalculatorList()
        });
        try {
            const currencyMap = await CurrencyService.fetchCurrencyMap();
            CalculatorDto.exchangeMap = currencyMap;
            this.setState({
                currencyList: Object.keys(currencyMap).sort(),
                _currencyListIsReady: true
            });
        } catch (error) {
            console.log('Currency map error', error);
            this.setState({_currencyListIsReady: true});
        }
    };

    createCalculator = (calculatorInput) => {
        const calculator = new CalculatorDto(calculatorInput);
        calculator.id = uuid.v4();
        const newCalculatorList = [...this.state.calculatorList, calculator];
        CalculatorService.setCalculatorList(newCalculatorList);
        this.setState({
            calculatorList: newCalculatorList,
        });
    };

    editCalculator = (calculatorInput) => {
        const newCalculatorList = this.state.calculatorList.map((calculator) => (calculator.id === calculatorInput.id) ? new CalculatorDto(calculatorInput) : calculator);
        CalculatorService.setCalculatorList(newCalculatorList);
        this.setState({
            calculatorList: newCalculatorList,
        });
    };

    deleteCalculator = (calculatorId) => {
        const newCalculatorList = this.state.calculatorList.filter(t => t.id !== calculatorId);
        CalculatorService.setCalculatorList(newCalculatorList);
        this.setState({
            calculatorList: newCalculatorList,
        });
    };

    calculate = (calculatorId, measureName, measureValue) => {
        const newCalculatorList = this.state.calculatorList.map((calculator) => {
            if (calculator.id === calculatorId) {
                const newCalculator = new CalculatorDto(calculator);
                newCalculator.calculate(measureName, measureValue);
                return newCalculator;
            } else {
                return calculator;
            }

        });
        CalculatorService.setCalculatorList(newCalculatorList);
        this.setState({
            calculatorList: newCalculatorList
        });
    };

    render() {
        const {calculatorList, currencyList} = this.state;
        return <CalculatorList calculatorList={calculatorList}
                               currencyList={currencyList}
                               calculate={this.calculate}
                               editCalculator={this.editCalculator}
                               deleteCalculator={this.deleteCalculator}
                               createCalculator={this.createCalculator}/>;
    }
}


export default CalculatorListContainer;
