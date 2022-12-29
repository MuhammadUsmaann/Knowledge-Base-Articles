// Import all components here
// import React, { Component } from 'react'
import Home from './Home/Home';
import Users from './Users/Users';


import Login from './Authentication/login';
import ForgotPassword from './Authentication/forgotpassword';
import NotFound from './Authentication/404';
import InternalServer from './Authentication/500';
import Articles from './Articles/Articles';

const Routes = [
    {
        path: "/",
        name: 'dashboard',
        exact: true,
        pageTitle: "Home",
        component: Home
    },
    {
        path: "/users",
        name: 'users',
        exact: true,
        pageTitle: "Users",
        component: Users
    },
    {
        path: "/articles",
        name: 'articles',
        exact: true,
        pageTitle: "Articles",
        component: Articles
    },

    {
        path: "/login",
        name: 'login',
        exact: true,
        pageTitle: "Tables",
        component: Login
    },
    {
        path: "/forgotpassword",
        name: 'forgotpassword',
        exact: true,
        pageTitle: "Tables",
        component: ForgotPassword
    },
    {
        path: "/notfound",
        name: 'notfound',
        exact: true,
        pageTitle: "Tables",
        component: NotFound
    },
    {
        path: "/internalserver",
        name: 'internalserver',
        exact: true,
        pageTitle: "Tables",
        component: InternalServer
    },
];

export default Routes;