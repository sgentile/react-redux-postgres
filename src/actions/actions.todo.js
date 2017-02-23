import * as types from './actionTypes';
import expect from 'expect';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getAllTodos from './todos';
import onTodoStatusChange from './onTodoStatusChange';
import createTodo from './createTodo';
import onDeleteTodo from './onDeleteToDo';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', ()=>{
  it('should create an action to load todos', () =>{
    const expectedAction = {
      type: types.LOAD_TODOS
    };

    expect(getAllTodos()).toEqual(expectedAction);
  });

  it('should create an action to handle status change updates', () =>{
    const todo = {};
    const expectedAction = {
      type: types.TODO_STATUS_CHANGE,
      todo
    };

    expect(onTodoStatusChange(todo)).toEqual(expectedAction);
  });

  it('should create an action to add todos and then reset the form', () =>{
    const todo = {name:'Sample todo'};
    const expectedActions = [
      { todo: { name: 'Sample todo' }, type: types.ADD_TODO },
        { meta: { form: 'addTodo' }, type: '@@redux-form/RESET' } ];

    const store = mockStore({
      todosState:{todos:[]}
    });

    return store.dispatch(createTodo(todo))
     .then(() => {
        expect(store.getActions()).toEqual(expectedActions);

      });
  });

  it('should create an action to delete todo', () => {
    const id = 1;
    const expectedAction = {
      type: types.DELETE_TODO,
      id
    };

    expect(onDeleteTodo(id)).toEqual(expectedAction);
  });
});
