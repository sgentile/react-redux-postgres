import * as ACTION from './actionTypes';

const onDeleteToDo = (id) => {
   return {
    type: ACTION.DELETE_TODO,
    id
  }
};

export default onDeleteToDo;
