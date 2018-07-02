import React from 'react';
import ReactDOM from 'react-dom';

import  { BrowserRouter, Switch, Route } from 'react-router-dom';

import 'babel-polyfill';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Home from './home';
import Login from './login';
import SignUp from './signup';
import App from '../main/containers/App'
import './login.css';


ReactDOM.render(
    <BrowserRouter>
        <div>       
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/profile/:username" component={App}/>
            </Switch>           
        </div>
    </BrowserRouter>,
    document.getElementById('container')
)


