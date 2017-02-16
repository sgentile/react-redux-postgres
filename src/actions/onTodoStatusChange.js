import * as ACTION from './actionTypes';

const onTodoStatusChange = (todo) => {
    return {
        type: ACTION.TODO_STATUS_CHANGE,
        todo
    }
};

export default onTodoStatusChange;
