import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
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
import Orders from './admin/order/index';
import NewOrder from './admin/order/new_order';
import Carriers from './admin/carrier/index';
import NewCarrier from './admin/carrier/add';
import Vendors from './admin/vendor/index';
import NewVendor from './admin/vendor/add';
import { ToastProvider } from 'react-toast-notifications';
import {default as AlertTemplate} from './components/Alert';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  containerStyle: {
    top: '0px',
    display: 'inherit'
  },
  transition: transitions.FADE
}

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
          <Router history={history}>  
            <Switch>  
              {/* <Route exact path="/">  
                <Redirect to="/layout1" />  
              </Route>   */}
              <LoginLayoutRoute path="/login" component={LoginPage} />  
              {/* <DashboardLayoutRoute path="/admin" component={Dashboard} /> */}
                <ToastProvider>
                  <AlertProvider template={AlertTemplate} {...options}>
                    <DashboardLayout>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/" component={Dashboard}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin" component={Dashboard}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/blogs" component={Blog}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/settings" component={Setting}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/roles-and-permissions" component={RolePermission}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/orders" component={Orders}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/orders/new" component={NewOrder}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/carriers" component={Carriers}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/carriers/new" component={NewCarrier}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/vendors" component={Vendors}/>
                      <PrivateRoute exact isLoggedIn={isLoggedIn} path="/admin/vendors/new" component={NewVendor}/>
                    </DashboardLayout>
                  </AlertProvider>
                </ToastProvider>
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