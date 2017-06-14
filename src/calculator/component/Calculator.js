import React from 'react';
import {PropTypes} from 'prop-types';
import CalculatorDto from '../dto/CalculatorDto';
import {Button} from 'semantic-ui-react';

const changeInput = (calculate, calculator) => (event) => calculate(calculator.id, event.target.name, event.target.value);

const onDeleteCalculator = (deleteCalculator, calculator) => () => deleteCalculator(calculator.id);

const onOpenEdit = (openEdit) => () => openEdit();

const Calculator = ({openEdit, deleteCalculator, calculator, calculate,
    calculator: {country, region, period, type, currency, measureMap}}) => {
    return (
        <div className='ui card'>
            <div className='content'>
                <div className='header'>
                    <span>{country} - {region}</span>
                </div>
                <div className='meta'>
                    <span>{period}</span>
                    <span>{type}</span>
                    <span>{currency}</span>
                </div>
                <hr/>
                <div className='ui form'>
                    {
                        Object.keys(measureMap).map((fieldName) => {
                            return (
                                <div className='field' key={fieldName}>
                                    <label>{fieldName}: </label>
                                    <input type='text'
                                           value={measureMap[fieldName] || ''}
                                           placeholder='0'
                                           name={fieldName}
                                           onChange={changeInput(calculate, calculator)}/>
                                </div>)
                        })
                    }
                </div>
                <hr/>
                <div className='ui two bottom attached buttons'>
                    <Button primary
                            onClick={onOpenEdit(openEdit)}>
                        <span>Edit</span>
                    </Button>
                    <Button secondary
                            onClick={onDeleteCalculator(deleteCalculator, calculator)}>
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

Calculator.propTypes = {
    calculator: PropTypes.instanceOf(CalculatorDto).isRequired,
    openEdit: PropTypes.func.isRequired,
    deleteCalculator: PropTypes.func.isRequired,
    calculate: PropTypes.func.isRequired
};

export default Calculator;
