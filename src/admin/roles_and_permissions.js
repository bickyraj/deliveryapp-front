import React from 'react';
import {API_ROLES, API_STORE_ROLES} from '../api_urls';
import httpClient from '../utils/httpClient';
import {Modal} from '../components/Modal';
import { connect } from "react-redux";
import { remove } from "../actions/role";
import { useToasts } from 'react-toast-notifications';
import { capitalize } from '../utils/util';
import { withAlert } from 'react-alert'
import { compose } from 'redux'

function withToast(Component) {
  return function WrappedComponent(props) {
    const toastFuncs = useToasts()
    return <Component {...props} {...toastFuncs} />;
  }
}

const CreateRoleForm = ({onSubmit, onChange}) => {
  return <form method="POST" onSubmit={onSubmit}>
    <div className="">
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name</label>
      <div className="mt-1">
        <input type="text" id="title" onChange={onChange} className="shadow-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="" />
      </div>
    </div>
  </form>;
}

class RolePermission extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        roles: null,
        openModal: false,
        roleForm: {
          name: null
        }
      };

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ roleForm: {
      ...this.state.roleForm,
      [e.target.name]: e.target.value
    } });
  }

  async onSubmit(e) {
    e.preventDefault();
    await httpClient.post(API_STORE_ROLES, this.state.roleForm).then((response) => {
      this.props.addToast(response.data.message, {autoDismiss: true, appearance: 'success'});
      this.setState({openModal: false})
      this.getRoles();
    }).catch((error) => {
      let res = error;
      console.log(res);
    });
  }
  
  async getRoles() {
    return await httpClient.get(API_ROLES).then((data) => {
      this.setState({roles: data})
    })
    .catch(err => {
      console.log('error fetching roles');
    });
  }

  componentDidMount() {
    if (!this.state.data) {
        this.getRoles();
    }
  }

  onRemoveRole(e, role) {
    const self = this;
    const { dispatch, addToast, alert } = this.props;

      e.preventDefault();
      alert.show('Are you sure you want to delete this role?', {
        title: 'Delete Role'.concat(" \""+capitalize(role.name)+"\""),
        type: 'error',
        onConfirm: () => {
          dispatch(remove(role.id)).then(function (response) {
            addToast(response.data.message, {autoDismiss: true, appearance: 'success'});
            self.getRoles();
          }).catch(function(error) {
            addToast(error.response.data.message, {autoDismiss: true, appearance: 'error'});
          }).finally(() => {
            alert.removeAll()
          });
        }
      })
    }
  

  renderRoleTableData() {
    if (this.state.roles !== null) {
      return this.state.roles.data.data.map((role, index) => {
         const { id, name, guard_name: guard } = role //destructuring
         return (
             <tr key={id} className="bg-white">
                 <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                     {++index}
                 </td>
               <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                 <div className="flex">
                   <a href="/" className="group inline-flex space-x-2 truncate text-sm">
                     {/* <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                       <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                     </svg> */}
                     <p className="text-gray-500 truncate group-hover:text-gray-900">
                       {capitalize(name)}
                     </p>
                   </a>
                 </div>
               </td>
               {/* <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                   {guard}
                 </span>
               </td> */}
               {/* <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
               </td> */}
               <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                 <div title="remove role" className="flex hover:text-red-500 text-gray-500 truncate group-hover:text-gray-900 cursor-pointer" onClick={(e) => {this.onRemoveRole(e, role);}}>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                   </div>
               </td>
             </tr>
         )
      })
    }
  }

  render() {
    function testRoleForm(props) {
      return <form method="POST" onSubmit={props.onSubmit}>
        <div className="">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <input type="text" id="title" onChange={props.onChange} name="name" className="shadow-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="" />
          </div>
        </div>
      </form>;
    }
    
      return <div>
          <div className="hidden sm:block mt-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative pb-5 border-b border-gray-200 sm:pb-0">
                <div className="md:flex md:items-center md:justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Roles and Permissions
                  </h3>
                  <div className="mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0">
                    {/* <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Roles
                    </button> */}
                    <button type="button" onClick={() => this.setState({openModal: true})} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Create
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="sm:hidden">
                    <label htmlFor="selected-tab" className="sr-only">Select a tab</label>
                    <select id="selected-tab" name="selected-tab" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                      <option>Roles</option>

                      <option>Permissions</option>
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <nav className="-mb-px flex space-x-8">
                      <a href="/" className="whitespace-nowrap pb-4 px-1 border-primary-600 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        Roles
                      </a>

                      <a href="/" className="whitespace-nowrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300">
                        Permissions
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SN
                          </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roles
                        </th>
                        {/* <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                          Guard
                        </th> */}
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* <tr className="bg-white">
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              1
                          </td>
                        <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex">
                            <a href="/" className="group inline-flex space-x-2 truncate text-sm">
                              <svg className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                Payment to Molly Sanders
                              </p>
                            </a>
                          </div>
                        </td>
                        <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                            success
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                          July 11, 2020
                        </td>
                      </tr> */}

                      {this.renderRoleTableData()}

                    </tbody>
                  </table>
                  <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium">1</span>
                        to
                        <span className="font-medium">10</span>
                        of
                        <span className="font-medium">20</span>
                        results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <a href="/" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                      </a>
                      <a href="/" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Add New Role"
            children={testRoleForm(this)}
            open={this.state.openModal}
            confirmBtn="Submit"
            formSubmit={this.onSubmit}
          />
      </div>
  }
}


export default compose(
  withToast,
  withAlert(),
  connect()
)(RolePermission)