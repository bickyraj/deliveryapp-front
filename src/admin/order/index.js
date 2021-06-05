import React from 'react';
import {API_ORDERS} from '../../api_urls';
import httpClient from '../../utils/httpClient';
import {connect} from "react-redux";
import {useToasts} from 'react-toast-notifications';
import {withAlert} from 'react-alert'
import {compose} from 'redux'
import {Link} from 'react-router-dom';
import OrderStatusLabel from '../../components/OrderStatusLabel';
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
            orders: null,
            openModal: false,
        };

        this.onChange = this
            .onChange
            .bind(this)
    }

    onChange(e) {
    }

    async getOrders() {
      return await httpClient.get(API_ORDERS).then((data) => {
        this.setState({orders: data})
      })
      .catch(err => {
        console.log('error fetching orders');
      });
    }
    
    renderOrderTableData = () => {
        if (this.state.orders !== null) {
          return this.state.orders.data.data.map((order, index) => {
             const { id, ref_id, full_name, status_label, delivery_address, status, created_at } = order //destructuring
             return (
                 <tr key={id} className="bg-white">
                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        {++index}
                    </td>
                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium capitalize bg-cyan-100 text-cyan-800`}>
                          {ref_id}
                        </span>
                    </td>
                   <td className="max-w-0 px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                     <div className="flex">
                       <a href="/" className="group inline-flex space-x-2 truncate text-sm">
                         <p className="capitalize text-gray-500 truncate group-hover:text-gray-900">
                           {full_name}
                         </p>
                       </a>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                       <Moment format="YYYY/MM/DD">{created_at}</Moment>
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                       {delivery_address}
                   </td>
                   <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                     <OrderStatusLabel status={status} label={status_label}></OrderStatusLabel>
                   </td>
                 </tr>
             )
          })
        }
    }

    componentDidMount() {
      if (!this.state.data) {
          this.getOrders();
      }
    }

    render() {
        return <div>
            <div className="hidden sm:block mt-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative mb-5 pb-5 border-b border-gray-200 sm:pb-0">
                        <div className="flex pb-3 w-full md:items-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Orders
                            </h3>
                            <div className="ml-auto">
                                <Link
                                    to="/admin/orders/new"
                                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    New Order
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
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SN
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ref ID
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer Name
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Delivery date
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {this.renderOrderTableData()}
                                </tbody>
                            </table>
                            <nav
                                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                                aria-label="Pagination">
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
                                    <a
                                        href="/"
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Previous
                                    </a>
                                    <a
                                        href="/"
                                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Next
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default compose(withToast, withAlert(), connect())(Index)