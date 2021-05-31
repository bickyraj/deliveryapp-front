import React, { Component } from 'react';  
import { Router, Switch, Route, Link } from 'react-router-dom'; 

const LoginLayout = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  );
} 
  
const LoginLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <LoginLayout>  
          <Component {...matchProps} />  
      </LoginLayout>  
    )} />  
  )  
}; 

export default LoginLayoutRoute;  
