import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Button, Card, Form} from 'semantic-ui-react';
import classnames from 'classnames';
import CalculatorDto from '../dto/CalculatorDto';

const editCalculatorProperty = (calculatorIn, editCalculatorProperty) => (event) => {
    const calculator = new CalculatorDto(calculatorIn);
    calculator[event.target.name] = event.target.value;
    editCalculatorProperty(calculator);
};

class CalculatorForm extends Component {
    state = {
        submitError: false
    };

    renderSelect = (value, name, selectList) => {
        const dropdownClass = classnames(
            'ui',
            'selection',
            'dropdown',
            {
                'error': this.state.submitError && !value,
            }
        );
        return (
            <div>
                <label htmlFor={name}>{name}</label>
                <select className={dropdownClass}
                        onChange={editCalculatorProperty(this.props.calculator, this.props.editCalculatorProperty)}
                        value={value || ''}
                        name={name}>

                    { [
                        <option className='item' value='' key='empty' disabled>{name}</option>,
                        ...selectList.map((selectValue, index) => (
                            <option className='item' value={selectValue} key={index}>
                                {selectValue}
                            </option>
                        )),
                    ] }
                </select>
            </div>
        );
    };

    render() {
        const {id, country, region, period, type, currency, countryList, regionList, typeList, periodList} = this.props.calculator;
        const {calculator, currencyList, closeForm, submitForm} = this.props;
        const submitText = id ? 'Update' : 'Create';

        const onSubmitForm = () => {
            if (country && region && period && type && currency) {
                submitForm(calculator);
            } else {
                this.setState({submitError: true});
            }
        };

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {submitText}
                    </Card.Header>
                    <hr/>
                    <Form>
                        {this.renderSelect(country, 'country', countryList)}
                        {this.renderSelect(region, 'region', regionList)}
                        {this.renderSelect(type, 'type', typeList)}
                        {this.renderSelect(period, 'period', periodList)}
                        {this.renderSelect(currency, 'currency', currencyList)}
                    </Form>
                    <hr/>
                    <div className='ui two bottom attached buttons'>
                        <Button primary
                                onClick={onSubmitForm}>
                            <span>{submitText}</span>
                        </Button>
                        <Button secondary
                                onClick={closeForm}>
                            <span>Cancel</span>
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

CalculatorForm.propTypes = {
    calculator: PropTypes.instanceOf(CalculatorDto).isRequired,
    currencyList: PropTypes.array,
    closeForm: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired
};

export default CalculatorForm;
