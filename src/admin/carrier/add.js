import React from 'react';
import { connect } from "react-redux";
import { create } from '../../actions/carrier';
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

class NewCarrier extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form_valid: () => {
                if (this.state.form.first_name !== "" && this.state.form.email !== "" && this.state.form.phone_number !== "") {
                    return true;
                }
                return false;
            },
            loading: false,
            form: {
                first_name: "",
                last_name: "",
                registered_date: "",
                email: "",
                address: "",
                phone_number: "",
                
            },
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(event) {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        const { dispatch, addToast} = this.props;
        self.setState({loading: true});
        setTimeout(() => {
            // save data to order
            dispatch(create(this.state.form)).then(response =>  {
              addToast(response.data.message, {autoDismiss: true, appearance: 'success'});
              history.push('/admin/carriers');
            }).catch(function(error) {
              addToast(error.response.data.message, {autoDismiss: true, appearance: 'error'});
            }).finally(() => {
                self.setState({loading: false});
            });
        }, 500);
    }

    render() {
        return (
            <>
                <div className="hidden sm:block">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="pt-6 divide-y divide-gray-200">
                            <div className="">
                                <div>
                                    <h2 className="mb-3 text-lg leading-6 font-medium text-gray-900">New Carrier</h2>
                                    {/* <p className="mt-1 text-sm text-gray-500">
                                    Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                                    </p> */}
                                </div>
                                <div className="mt-10 sm:mt-3">
                                    <div className="md:grid md:grid-cols md:gap-6">
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form
                                                onSubmit={(e) => {
                                                this.handleSubmit(e)
                                            }}
                                                method="POST">
                                                <div className="overflow-hidden">
                                                    <div className="px-4 py-5 bg-white sm:p-6">
                                                        <div className="grid grid-cols-6 gap-6">
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                                                    First Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="first_name"
                                                                    value={this.state.form.first_name}
                                                                    onChange={this.handleChange}
                                                                    id="first_name"
                                                                    autoComplete="given-name"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                                                    Last Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="last_name"
                                                                    value={this.state.form.last_name}
                                                                    onChange={this.handleChange}
                                                                    id="last_name"
                                                                    autoComplete="given-name"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                    Email Address
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    value={this.state.form.email}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="off"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                                                    Mobile Number *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="phone_number"
                                                                    id="phone_number"
                                                                    value={this.state.form.phone_number}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="phone"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                                    Address
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="address"
                                                                    id="address"
                                                                    value={this.state.form.address}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="address"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="registered_date" className="block text-sm font-medium text-gray-700">
                                                                    Registered Date *
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    name="registered_date"
                                                                    id="registered_date"
                                                                    value={this.state.form.registered_date}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="date"
                                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className={`items-center inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${this.state.form_valid() || this.state.loading ?"bg-indigo-700 hover:bg-indigo-800": "bg-gray-300 hover:bg-gray-300"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                            disabled={!this.state.form_valid()}
                                                            >
                                                            {this.state.loading ? "Submitting...": "Submit"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default compose(withToast, withAlert(), connect())(NewCarrier)