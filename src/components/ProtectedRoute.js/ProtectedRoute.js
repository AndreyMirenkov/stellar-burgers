import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ authorize, children, ...props }) => {

    const loggedIn = useSelector(store => store.authReducer.loggedIn)

    const location = useLocation();
      
        if (!authorize && loggedIn) {
          const { from } = location.state || { from: { pathname: "/" } };
          return (
            <Route {...props}>
              <Redirect to={from} />
            </Route>
          );
        }
      
        if (authorize && !loggedIn) {
          return (
            <Route {...props}>
              <Redirect to={{ pathname: "/login", state: { from: location } }} />
            </Route>
          );
        }
      
        return <Route {...props}>{children}</Route>;
      };

  ProtectedRoute.propTypes = {
    authorize: PropTypes.bool.isRequired,
    children: PropTypes.element,
  }
  
  export default ProtectedRoute; 