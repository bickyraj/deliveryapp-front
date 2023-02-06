import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="hidden lg:flex lg:flex-shrink-0">
              <div className="flex flex-col w-64">
                {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
                <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/v1/easywire-logo-on-brand.svg" alt="Easywire logo" />
                  </div>
                  <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
                    <div className="overflow-y-auto">
                      <nav className="px-2 space-y-1">
                        <Link to="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white bg-cyan-800 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: home --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-100 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          Home
                        </Link>

                        <Link to="/admin/orders" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: clock --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                          Orders
                        </Link>

                        <Link to="/admin/carriers" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: clock --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          Carriers
                        </Link>

                        <Link to="/admin/vendors" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: clock --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                          </svg>
                          Vendors
                        </Link>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: scale --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                          Balances
                        </a>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: credit-card --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Cards
                        </a>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: user-group --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Recipients
                        </a>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: document-report --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-300 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Reports
                        </a>
                      </nav>
                    </div>
                    <hr className="h-px mt-6 bg-cyan-700 border-none" />
                    <div className="mt-6 flex-1 h-0 overflow-y-auto">
                      <nav className="px-2 space-y-1">
                        <Link to="/admin/settings" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: cog --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: question-mark-circle --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Help
                        </a>

                        <a href="/" className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 focus:outline-none transition ease-in-out duration-150">
                          {/* <!-- Heroicon name: shield-check --> */}
                          <svg className="mr-4 h-6 w-6 text-cyan-100 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Privacy
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default Sidebar;