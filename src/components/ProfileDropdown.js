import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { logout } from '../actions/auth';

class ProfileDropdown extends React.Component {
    constructor(props) {
      super(props);

        this.state = {
            isToggleOn: false,
            showHideDropdown: 'hidden',
        };

        this.logOut = this.logOut.bind(this);
        this.wrapperRef = React.createRef();
        this.profileRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                isToggleOn: false,
                showHideDropdown: 'hidden'
            });
        }
    }
    
    toggleDropdown = () => {
        if (this.state.isToggleOn) {
            this.setState({
                isToggleOn: false,
                showHideDropdown: 'hidden'
            });
        } else {
            this.setState({
                isToggleOn: true,
                showHideDropdown: ''
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        return (
            <div className="ml-3 relative" ref={this.wrapperRef}>
              <div>
                <button ref={this.profileRef} onClick={this.toggleDropdown} className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:bg-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-gray-100" id="user-menu" aria-label="User menu" aria-haspopup="true">
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  <p className="hidden ml-3 text-cool-gray-700 text-sm leading-5 font-medium lg:block">Emilia Birch</p>
                  {/* <!-- Heroicon name: chevron-down --> */}
                  <svg className="hidden flex-shrink-0 ml-1 h-5 w-5 text-cool-gray-400 lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${this.state.showHideDropdown}`}>
                <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <a href="/" className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Your Profile</a>
                  <a href="/" className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Settings</a>
                  <a href="/login" onClick={this.logOut} className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Logout</a>
                </div>
              </div>
            </div>
        );
    }
}
ProfileDropdown.propTypes = {
    children: PropTypes.element,
};

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(ProfileDropdown);