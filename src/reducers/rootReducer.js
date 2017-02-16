import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import todosState from './todosState';
/**
 * This is the 'root reducer' - http://redux.js.org/docs/api/combineReducers.html
 */
const reducers = combineReducers({
    routing: routerReducer,
    form: formReducer,
    todosState
});

export default reducers;