import * as ACTION from './actionTypes';
import {deleteWithToken} from '../utils/query';

const deleteToDo = (id) => {
  return {
    type: ACTION.DELETE_TODO,
    id
  }
};

const onDeleteToDo = (id) => {
   return (dispatch, getState) => {
     deleteWithToken(`api/todos/${id}`, dispatch, getState).then((response) => {
       dispatch(deleteToDo(id));
     });
   }
};



export default onDeleteToDo;
