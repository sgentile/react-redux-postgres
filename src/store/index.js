import {createStore, compose, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory} from 'react-router';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {loadState, saveState} from '../utils/localStorage';

const initialState = {
    todosState: {
    todos: [
      {id: 1, name: 'Take out trash', completed: true},
      {id: 2, name: 'Wash dishes', completed: false}
    ]
  }
};

const persistedState = loadState(initialState);
console.log(persistedState);
export function configureStore(history=hashHistory, initialState=persistedState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                thunk, routerMiddleware(history)
            ),
            window.devToolsExtension ? window.devToolsExtension() : (f) => f //noop function equivalent
        )
    );

    store.subscribe(()=>{
      saveState({
        todosState: store.getState().todosState
      });
    });

    return store;
}
