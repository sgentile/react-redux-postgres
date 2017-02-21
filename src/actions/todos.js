import * as ACTION from './actionTypes';
import {getWithToken} from '../utils/query';

const loadTodos = (todos) => {
  return {
    type: ACTION.LOAD_TODOS,
    todos
  }
};

const getAllTodos = () => {
   return (dispatch, getState) => {
     return getWithToken('/api/todos/user', dispatch, getState).then((response) => {
       dispatch(loadTodos(response.data));
     })
   }
};

export default getAllTodos;
