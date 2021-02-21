import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';
import LoginRequiredRoute from 'utils/LoginRequiredRoute';

function Routes({ match }) { // match.url을 통해 상위 url을 받아볼 수 있다. (accounts/)
    return (
        <>
            <LoginRequiredRoute exact path={match.url + '/profile'} component={Profile} />
            <Route exact path={match.url + '/login'} component={Login} />
            <Route exact path={match.url + '/signup'} component={Signup} />
        </>
    );
}

export default Routes;