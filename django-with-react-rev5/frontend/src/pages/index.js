import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Home from './Home';
import AccountRoutes from './accounts';
import PostNew from './PostNew';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';

function Root() {
    return (
        <>
            <LoginRequiredRoute exact path='/' component={Home} />
            <LoginRequiredRoute exact path='/posts/new' component={PostNew} />
            <Route exact path='/about' component={About} />
            <Route path='/accounts' component={AccountRoutes} />
        </>
    );
}

export default Root;