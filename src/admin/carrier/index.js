import React from 'react';
import {API_CARRIERS} from '../../api_urls';
import httpClient from '../../utils/httpClient';
import {connect} from "react-redux";
import {useToasts} from 'react-toast-notifications';
import {withAlert} from 'react-alert'
import {compose} from 'redux'
import {Link} from 'react-router-dom';
import Paginator from '../../components/Paginator';
import { getQueryStringValue } from '../../utils/util';
import Moment from 'react-moment';

function withToast(Component) {
    return function WrappedComponent(props) {
        const toastFuncs = useToasts()
        return <Component {...props} {...toastFuncs}/>;
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carriers: null,
            openModal: false,
            currentPage: null,
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    async getCarriers() {
        let apiUrl = (this.state.currentPage != null) ? API_CARRIERS + '?page='+this.state.currentPage: API_CARRIERS;
      return await httpClient.get(apiUrl).then((data) => {
        this.setState({carriers: data})

        const newUrl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?page=' + this.state.currentPage;

        window.history.pushState({ path: newUrl }, '', newUrl);
        
      })
      .catch(err => {
        console.log('error fetching carriers');
      });
    }

    
    
    async componentDidMount() {
        const page = getQueryStringValue('page');
        await Promise.resolve(
            this.setState(() => ({ currentPage: page ? page : 1 }))
        );
        
      if (!this.state.data) {
          this.getCarriers();
      }
    }
    
    renderOrderTableData = () => {
        if (this.state.carriers !== null) {
            let sn = this.state.carriers.data.from;
          return this.state.carriers.data.data.map((order, index) => {
             const { id, first_name, last_name, email, phone_number, registered_date} = order //destructuring
             return (
                 <tr key={id} className="bg-white">
                    <td className="px-6 py-4 text-left text-sm text-gray-500">
                        {sn++}
                    </td>
                   <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     <div className="flex">
                       {/* <a href="/" className="group inline-flex space-x-2 truncate text-sm"> */}
                         <p className="capitalize text-gray-500 truncate group-hover:text-gray-900">
                           {first_name.concat(" " + last_name)}
                         </p>
                       {/* </a> */}
                     </div>
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                       {phone_number}
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                       {email}
                   </td>
                   {<td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                       <Moment format="YYYY/MM/DD">{registered_date}</Moment>
                   </td>}
                   {/* <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                     <OrderStatusLabel status={status} label={status_label}></OrderStatusLabel>
                   </td> */}
                 </tr>
             )
          })
        }
    }

    async handlePageClick(page) {
        await Promise.resolve(this.setState(() => ({ currentPage: page })));
        this.getCarriers(page);
    }

    render() {
        return <div>
            <div className="hidden sm:block mt-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative mb-5 pb-5 border-b border-gray-200 sm:pb-0">
                        <div className="flex pb-3 w-full md:items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Carriers
                            </h3>
                            <div className="ml-auto">
                                <Link
                                    to="/admin/carriers/new"
                                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    New Carrier
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                                            SN
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Full Name
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Mobile Number
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registered Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {this.renderOrderTableData()}
                                </tbody>
                            </table>
                        </div>
                        <Paginator paginate={this.state.carriers} onPageChange={(page) => this.handlePageClick(page)}></Paginator>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default compose(withToast, withAlert(), connect())(Index)