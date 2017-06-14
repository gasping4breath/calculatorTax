import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import CalculatorForm from './CalculatorForm';
import CalculatorDto from '../dto/CalculatorDto';
import {Button} from 'semantic-ui-react';

class NewCalculator extends Component {
    state = {
        createFormIsOpen: false,
        calculator: new CalculatorDto({})
    };

    openForm = () => {
        this.setState({createFormIsOpen: true});
    };

    closeForm = () => {
        this.setState({createFormIsOpen: false});
    };

    submitForm = (calculator) => {
        this.props.createCalculator(calculator);
        this.setState({createFormIsOpen: false});
    };

    editCalculatorProperty = (calculator) => {
        this.setState({calculator: calculator});
    };

    render() {
        const {createFormIsOpen, calculator} = this.state;
        const {currencyList} = this.props;
        if (createFormIsOpen) {
            return (
                <CalculatorForm calculator={calculator}
                                currencyList={currencyList}
                                editCalculatorProperty={this.editCalculatorProperty}
                                submitForm={this.submitForm}
                                closeForm={this.closeForm}/>
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <Button primary
                        onClick={this.openForm}>
                        <i className='plus icon'/>
                        <span>New calculator</span>
                    </Button>
                </div>
            );
        }
    }
}

NewCalculator.propTypes = {
    currencyList: PropTypes.array
};

export default NewCalculator;
