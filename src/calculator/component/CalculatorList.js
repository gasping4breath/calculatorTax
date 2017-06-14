import {PropTypes} from 'prop-types';
import React from 'react';
import NewCalculator from './NewCalculator';
import EditCalculator from './EditCalculator';
import CalculatorDto from '../dto/CalculatorDto';

const CalculatorList = ({calculatorList, calculator, currencyList, calculate, editCalculator, deleteCalculator, createCalculator}) => (
    <div id='calculatorList'>
        <div className='ui three stackable cards'>
            {calculatorList.map((calculator) => (
                <EditCalculator key={calculator.id}
                                calculator={calculator}
                                currencyList={currencyList}
                                calculate={calculate}
                                editCalculator={editCalculator}
                                deleteCalculator={deleteCalculator}/>
            ))}
            <NewCalculator currencyList={currencyList}
                           createCalculator={createCalculator}/>
        </div>
    </div>
);

CalculatorList.propTypes = {
    calculator: PropTypes.instanceOf(CalculatorDto),
    currencyList: PropTypes.array,
    calculate: PropTypes.func.isRequired,
    editCalculator: PropTypes.func.isRequired,
    deleteCalculator: PropTypes.func.isRequired,
    createCalculator: PropTypes.func.isRequired
};

export default CalculatorList;
