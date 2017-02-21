import {createStore, compose, applyMiddleware} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory} from 'react-router';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {loadState, saveState, getToken} from '../utils/localStorage';
import {loginUserSuccess} from '../actions/auth';

// const initialState = {
//     todosState: {
//     todos: [
//       {id: 1, name: 'Take out trash', completed: true},
//       {id: 2, name: 'Wash dishes', completed: false}
//     ]
//   }
// };

const initialState = {
  todosState: {
    todos: []
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

    const token = getToken();
    if(token !== null) {
      store.dispatch(loginUserSuccess(token));
    }

  //return store;

    store.subscribe(()=>{
      saveState({
        todosState: store.getState().todosState
      });
    });

    return store;
}
