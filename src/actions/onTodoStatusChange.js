import * as ACTION from './actionTypes';
import {updateWithToken} from '../utils/query';

const todoStatusChanged = (todo) => {
  return {
    type: ACTION.TODO_STATUS_CHANGE,
    todo
  }
};

const onTodoStatusChange = (todo) => {
    return (dispatch, getState) => {
      updateWithToken('/api/todos', todo, dispatch, getState).then((response) => {
        dispatch(todoStatusChanged(response.data));
      });
    }
};



export default onTodoStatusChange;
