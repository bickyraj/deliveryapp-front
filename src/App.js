import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from "react-redux";

/** Layouts **/  
import LoginLayoutRoute from "./layouts/login";
import DashboardLayout from "./layouts/dashboard";

import { history } from './helpers/history';

/** Components **/  
import Dashboard from './admin/dashboard';  
import LoginPage from './login';
import Blog from './admin/blogs';
import Setting from './admin/settings';
import PrivateRoute from './PrivateRoute';
import RolePermission from './admin/roles_and_permissions';
import { ToastProvider, useToasts } from 'react-toast-notifications';

class App extends Component {
  constructor(props) {
    super(props);
    history.listen((location) => {
    });
  }

  render() {  
    const { isLoggedIn } = this.props;

    return (  
        <div>
          <Router>  
            <Switch>  
              {/* <Route exact path="/">  
                <Redirect to="/layout1" />  
              </Route>   */}
              <LoginLayoutRoute path="/login" component={LoginPage} />  
              {/* <DashboardLayoutRoute path="/admin" component={Dashboard} /> */}
              <DashboardLayout>
                <PrivateRoute exact isLoggedIn={isLoggedIn} path="/" component={Dashboard}/>
                <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin" component={Dashboard}/>
                <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/blogs" component={Blog}/>
                <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/settings" component={Setting}/>
                <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/roles-and-permissions" component={RolePermission}/>
              </DashboardLayout>
            </Switch>  
          </Router>  
        </div>
    );  
  }  
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn
  };
}

export default connect(mapStateToProps)(App);