import React from 'react';
import ReactDOM from 'react-dom';

import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'babel-polyfill';

import { Provider } from 'react-redux';

import { createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import rootReducer from '../store/reducers';

import Home from './home';
import Login from './login';
import SignUp from './signup';
import App from '../main/containers/App'
import './login.css';


const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>       
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/profile/:username" component={App}/>
                </Switch>           
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container')
)


