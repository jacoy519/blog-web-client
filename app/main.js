import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory , IndexRoute} from 'react-router';

import AccountLoginComponent from './components/AccountLoginComponent';
import HomeComponent from './components/HomeComponent';
import ArticleGetComponent from './components/home/ArticleGetComponent';
import ArticleListGetComponent from './components/home/ArticleListGetComponent';
import BookListGetComponent from './components/home/BookListGetComponent';
import AbstractListGetComponent from './components/home/AbstractListGetComponent';
import ArticleEditComponent from './components/edit/ArticleEditComponent';
import DeleteComponent from './components/edit/DeleteComponent';
import BookEditComponent from './components/edit/BookEditComponent';
import EditJumpComponent from  './components/edit/EditJumpComponent';
import PasswordResetEmailSendComponent from './components/account/PasswordResetEmailSendComponent';
import PasswordResetComponent from './components/account/PasswordResetComponent';


async function validateToken(nextState, replace, next) {
    const tokenResult = await fetch("http://"+ window.location.hostname +":3000/blog/rest/validation/token", {
        method: 'post',
        mode: 'cros',
        body: '',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'Access-Token' : localStorage.getItem("access-token") || ''
        }
    })
        .then((res) => res.json())
        .then((res) => {
            return res.result;
        })
        .catch((e) => {
        console.error(e);
        return false;
    });
    if(tokenResult === false) {
        console.log('redirect to home');
        replace('/home/1');
        next();
    } else {
        next();
    }
}

ReactDOM.render((
    <Router history={browserHistory}>

        <Route  path="/login" component={AccountLoginComponent}/>
        <Route  path = "/forgetPassword" component = {PasswordResetEmailSendComponent}/>
        <Route  path = "/resetPassword/:token" component = {PasswordResetComponent}/>
        <Route onEnter={validateToken} path="/edit/article/:operationKey(/:key)" component={ArticleEditComponent}/>
        <Route onEnter={validateToken} path="/edit/book/:operationKey(/:key)" component={BookEditComponent}/>
        <Route onEnter={validateToken} path="/delete/:item/:key" component={DeleteComponent}/>
        <Route onEnter={validateToken} path="/edit/finish" component={EditJumpComponent}/>
        <Route path="/" component={HomeComponent}>
            <IndexRoute component={ArticleListGetComponent}/>
            <Route path="/home/:pageNo" component={ArticleListGetComponent}/>
            <Route path="/article/:id" component={ArticleGetComponent}/>
            <Route path="/books" component={BookListGetComponent}/>
            <Route path="/:request/:key/:pageNo" component={AbstractListGetComponent}/>
        </Route>
    </Router>
), document.getElementById('content'));
