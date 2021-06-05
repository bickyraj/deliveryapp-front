import React from 'react';
import { connect } from "react-redux";
import { create } from '../../actions/order';
import { StepFormContext } from './step_form-context';
import {compose} from 'redux'
import {withAlert} from 'react-alert'
import {useToasts} from 'react-toast-notifications';
import {history} from '../../helpers/history';

function withToast(Component) {
    return function WrappedComponent(props) {
        const toastFuncs = useToasts()
        return <Component {...props} {...toastFuncs}/>;
    }
}

const OrderItem = function(name = null, price = null, quantity = null) {
    return {
        name: name,
        price: price,
        quantity: quantity
    };
};

class ItemsForm extends React.Component {
    
    static contextType = StepFormContext;
    constructor(props, context) {
        super(props, context);
        this.state = {
            step: 2,
            loading: false,
            itemList: this.context.itemList
                ? this.context.itemList: [{
                name: "",
                price: "",
                quantity: ""
            }]
        };

        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    handleInputChange(event, index) {
        const { name, value } = event.target;
        const list = this.state.itemList;
        list[index][name] = value;
        this.setState({itemList: list});

        this.context.itemList = this.state.itemList;
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        const { dispatch, addToast, alert } = this.props;
        const data = {
            customer_detail: this.context.customer_detail,
            item_list: this.state.itemList
        }
        self.setState({loading: true});
        setTimeout(() => {
            // save data to order
            dispatch(create(data)).then(response =>  {
              addToast(response.data.message, {autoDismiss: true, appearance: 'success'});
              history.push('/admin/orders');
            }).catch(function(error) {
              addToast(error.response.data.message, {autoDismiss: true, appearance: 'error'});
            }).finally(() => {
                self.setState({loading: false});
            //   alert.removeAll()
            });
        }, 500);
    }

    addItem(e) {
        e.preventDefault();
        let item = new OrderItem();
        this.setState({
            itemList: this.state.itemList.concat(item)
        })
    }

    removeItem(e, key) {
        const list = this.state.itemList;
        if (list.length > 1) {
            list.splice(key, 1);
            this.setState({
              itemList: list
            });
        }
    }

    renderItems() {
        const {itemList} = this.state;

        return (
            itemList.map((item, key) => (
                <div key={key} className={`relative px-4 py-5 bg-white sm:p-6 ${key !== 0 ? "mt-2": ""}`}>
                    <div onClick={(e) => this.removeItem(e, key)} className="absolute top-3 right-3 cursor-pointer" title="remove">
                        <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">
                                Item Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="item_name"
                                value={item.name}
                                onChange={(e) => {this.handleInputChange(e, key)}}
                                autoComplete="given-name"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => {this.handleInputChange(e, key)}}
                                autoComplete="off"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>

                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={item.price}
                                onChange={(e) => {this.handleInputChange(e, key)}}
                                autoComplete="phone"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>
                </div>
            ))
        );
    }

    render() {
        return (
            <StepFormContext.Consumer>
                {({stepForm}) => (
                    <>
                        <div className="mt-10 sm:mt-3">
                            <div className="md:grid md:grid-cols md:gap-6">
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <form onSubmit={(e) => {this.handleSubmit(e)}}>
                                        <div className="overflow-hidden">
                                            {this.renderItems()}
                                            
                                            <div className="flex px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                <button onClick={(e) => this.addItem(e)} className={`flex block mr-2 ml-auto items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${this.state.loading? "bg-primary-500 hover:bg-primary-500": "bg-primary-600 hover:bg-primary-700"}`}
                                                disabled={this.state.loading}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                                    Add Items</button>
                                                <button
                                                    type="submit"
                                                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${this.state.loading? "bg-indigo-500 hover:bg-indigo-500": "bg-indigo-700 hover:bg-indigo-800"}`}
                                                    disabled={this.state.loading}
                                                    >
                                                    {this.state.loading ? "Submitting...": "Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </StepFormContext.Consumer>
        );
    }
}

export default compose(withToast, withAlert(), connect())(ItemsForm)