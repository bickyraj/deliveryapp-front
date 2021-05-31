import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types'

function PrivateRoute({ component: Component, isLoggedIn, ...rest }) {
    if (isLoggedIn) {
        return <Route {...rest} render={props => <Component {...props} />} />;
    }
    return <Redirect to="login" />;
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default PrivateRoute;