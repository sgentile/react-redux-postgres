import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from '../components/AppContainer';
import {Home} from '../components/Home';

import LoginContainer from '../components/Auth/LoginContainer';
import {TodosContainer} from '../components/Todos';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/todos" component={TodosContainer}/>
    </Route>
);
