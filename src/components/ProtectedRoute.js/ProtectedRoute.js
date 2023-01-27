import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ authorize, children, ...props }) => {

    const loggedIn = useSelector(store => store.authReducer.loggedIn)

    return (
        <>
        { authorize
        ?
        <Route>
            {loggedIn ? children : <Redirect to= "/login" />}
        </Route>
        :
        <Route>
            {loggedIn ? <Redirect to= "/" /> : children}
        </Route>
        }
        </>
    );
  };

  ProtectedRoute.propTypes = {
    authorize: PropTypes.bool.isRequired,
    children: PropTypes.element,
  }
  
  export default ProtectedRoute; 