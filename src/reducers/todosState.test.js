import reducer from './todosState';
import * as types from '../actions/actionTypes';
import expect from 'expect';

//goal: A reducer should return the new state after applying the action to the previous state

describe('todos reducer', () => {

  const initialState = {
    todosState: {
      todos: []
    }
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_TODOS', () =>{
    expect(reducer(undefined, {
      type: types.LOAD_TODOS
    })).toEqual(initialState)
  });

  it('should handle ADD_TODO', () =>{
    const expectedValue = {
      todosState: {
        todos: []
      }
    };

    const result = reducer({todos:[]}, {
      type: types.ADD_TODO,
      todo: {name: 'New Todo'}
    });
    expect(result.todos.length).toEqual(1);
    expect(result.todos[0].name).toEqual('New Todo');
    expect(result.todos[0].completed).toEqual(false);
  });
});
