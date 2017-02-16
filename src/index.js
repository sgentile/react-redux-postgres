//https://babeljs.io/docs/usage/polyfill/
// "If you are using ES6’s import syntax in your application’s entry point, you should instead import the polyfill at the top of the entry point to ensure the polyfills are loaded first"
import 'babel-polyfill';

//https://babeljs.io/docs/usage/polyfill/
// "If you are using ES6’s import syntax in your application’s entry point, you should instead import the polyfill at the top of the entry point to ensure the polyfills are loaded first"
import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import routes from './routes';
import {configureStore} from './store';

/**
 * An initial store state can be restored from
 * local storage if needed.
 */
const initialStoreState = undefined;
const store = configureStore(browserHistory, initialStoreState);
const history = syncHistoryWithStore(browserHistory, store);


/**
 * index.less bootstraps all the styling and less files for the application:
 */
import './styles/index.less';


render((
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    ), document.getElementById('app-container')
);

