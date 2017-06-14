import React from 'react';
import {Button} from 'semantic-ui-react';
import CalculatorService from '../service/CalculatorService';

const deleteCalculatorList = () => CalculatorService.removeCalculatorList();

const Admin = () => {
    return (
        <div>
            <h3>Admin</h3>
            <Button primary
                    onClick={deleteCalculatorList}>
                <span>Delete all calculators</span>
            </Button>
        </div>
    );
};

export default Admin;
