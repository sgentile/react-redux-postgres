import * as ACTION from './actionTypes';
import {reset} from 'redux-form';


const addTodo = (todo) => {
  return {
    type: ACTION.ADD_TODO,
    todo
  }
};

//redux-thunk...
const createTodo =(todo) => {
  return (dispatch, getState) => {
    //simulate a network call
    return new Promise((resolve, reject) =>{
      dispatch(addTodo(todo));
      resolve();
    }).then(() =>{
      dispatch(reset('addTodo'));
    });

    // return postWithToken('/api/validatePerson', {_id}, dispatch, getState, false).then((response) => {
    //   dispatch(onValidateSuccess(response.data));
    // }, (error) => dispatch(onValidateError(error)));

  }
};

export default createTodo;
