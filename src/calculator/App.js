import React from 'react';
import SideBar from './component/SideBar';

import {
    BrowserRouter as Router
} from 'react-router-dom';

const App = () => (
    <Router>
        <div>
            <SideBar></SideBar>
        </div>
    </Router>
);

export default App;
