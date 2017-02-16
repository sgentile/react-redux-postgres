import * as ACTION from './actionTypes';

const getAllTodos = () => {
    return {
        type: ACTION.LOAD_TODOS
    }
};

export default getAllTodos;
