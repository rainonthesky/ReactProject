import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Life from './pages/demo/Life';
import Admin from './admin'
import Router from './router';
import { Provider } from 'react-redux'
import configureStore from './../src/redux/store/configureStore'
import registerServiceWorker from './registerServiceWorker';
const store =configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>
    , document.getElementById('root'));
    registerServiceWorker();
