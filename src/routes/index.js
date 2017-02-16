import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import {Home} from '../components/Home';
import {TodosContainer} from '../components/Todos';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/todos" component={TodosContainer}></Route>
    </Route>
);