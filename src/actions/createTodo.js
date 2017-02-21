import * as ACTION from './actionTypes';
import {reset} from 'redux-form';
import {postWithToken} from '../utils/query';


const addTodo = (todo) => {
  return {
    type: ACTION.ADD_TODO,
    todo
  }
};

//redux-thunk...
const createTodo =(todo) => {
  return (dispatch, getState) => {
    return postWithToken('/api/todos', todo, dispatch, getState).then((response) => {
      dispatch(addTodo(response.data));
      dispatch(reset('addTodo'));
    });

    // return postWithToken('/api/validatePerson', {_id}, dispatch, getState, false).then((response) => {
    //   dispatch(onValidateSuccess(response.data));
    // }, (error) => dispatch(onValidateError(error)));

  }
};

export default createTodo;
