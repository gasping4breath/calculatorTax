import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import CalculatorForm from './CalculatorForm';
import Calculator from './Calculator';
import CalculatorDto from '../dto/CalculatorDto';

class EditCalculator extends Component {
    state = {
        editFormIsOpen: false,
        calculator: new CalculatorDto(this.props.calculator)
    };

    editCalculatorProperty = (calculator) => {
        this.setState({calculator: calculator});
    };

    editCalculator = (calculator) => {
        this.props.editCalculator(calculator);
        this.closeForm();
    };

    closeForm = () => {
        this.setState({editFormIsOpen: false});
    };

    openEdit = () => {
        this.setState({editFormIsOpen: true});
    };

    render() {
        const {editFormIsOpen} = this.state;
        const {currencyList, calculate, deleteCalculator} = this.props;
        if (editFormIsOpen) {
            return (
                <CalculatorForm
                    calculator={this.state.calculator}
                    editCalculatorProperty={this.editCalculatorProperty}
                    currencyList={currencyList}
                    submitForm={this.editCalculator}
                    closeForm={this.closeForm}/>
            );
        } else {
            return (
                <Calculator
                    calculator={this.props.calculator}
                    calculate={calculate}
                    openEdit={this.openEdit}
                    deleteCalculator={deleteCalculator}/>
            );
        }
    }
}

EditCalculator.propTypes = {
    calculator: PropTypes.instanceOf(CalculatorDto),
    currencyList: PropTypes.array,
    calculate: PropTypes.func.isRequired,
    editCalculator: PropTypes.func.isRequired,
    deleteCalculator: PropTypes.func.isRequired
};

export default EditCalculator;
