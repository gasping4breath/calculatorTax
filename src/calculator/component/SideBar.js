import React from 'react';
import Admin from './Admin';
import CalculatorListContainer from '../container/CalculatorListContainer';
import {
    Route,
    Link,
    Switch,
} from 'react-router-dom';

import { Sidebar, Segment, Button, Menu, Icon} from 'semantic-ui-react'

class SideBar extends React.Component {
    state = {
        sideBarIsOpen: false
    };

    changeMenuVisibility = () => {
        this.setState({sideBarIsOpen: !this.state.sideBarIsOpen})
    };

    render() {
        const {sideBarIsOpen} = this.state;

        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin' visible={sideBarIsOpen} icon='labeled' vertical inverted>
                        <Menu.Item as={Link} to='/calculatorList' name='calculatorList'>
                            <Icon name='home' />
                            CalculatorList
                        </Menu.Item>
                        <Menu.Item as={Link} to='/admin' name='admin'>
                            <Icon name='settings' />
                            Admin
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Button onClick={this.changeMenuVisibility}><Icon name='list' />Menu</Button>
                        <Segment basic>
                            <Switch>
                                <Route path='/calculatorList' component={CalculatorListContainer}/>
                                <Route path='/admin' component={Admin}/>

                                <Route exact path='/' render={() => (
                                    <h3>Create as much calculators as you wish</h3>
                                )}/>

                                <Route render={({location}) => (
                                    <div className='ui inverted red segment'>
                                        <h3> No location <code>{location.pathname}</code></h3>
                                    </div>
                                )}/>
                            </Switch>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default SideBar;