import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';

function Routes({ match }) { // match.url을 통해 상위 url을 받아볼 수 있다. (accounts/)
    return (
        <>
            <Route exact path={match.url + '/profile'} component={Profile} />
            <Route exact path={match.url + '/login'} component={Login} />
        </>
    );
}

export default Routes;