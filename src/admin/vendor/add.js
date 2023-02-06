import React from 'react';
import { connect } from "react-redux";
import { create } from '../../actions/vendor';
import {compose} from 'redux'
import {withAlert} from 'react-alert'
import {useToasts} from 'react-toast-notifications';
import {history} from '../../helpers/history';
import Map from './map';
function withToast(Component) {
    return function WrappedComponent(props) {
        const toastFuncs = useToasts()
        return <Component {...props} {...toastFuncs}/>;
    }
}

class NewVendor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form_valid: () => {
                if (this.state.form.name !== "" && this.state.form.email !== "" && this.state.form.address !== "") {
                    return true;
                }
                return false;
            },
            loading: false,
            form: {
                name: "",
                email: "",
                address: "",
                location: ""
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
              history.push('/admin/vendors');
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
                                    <h2 className="mb-3 text-lg leading-6 font-medium text-gray-900">New Vendor</h2>
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
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                    Name *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    value={this.state.form.name}
                                                                    onChange={this.handleChange}
                                                                    id="name"
                                                                    autoComplete="given-name"
                                                                    className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>

                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                                    Email
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    value={this.state.form.email}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="off"
                                                                    className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
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
                                                                    className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-3">
                                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                                    Location
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="location"
                                                                    id="location"
                                                                    value={this.state.form.location}
                                                                    onChange={this.handleChange}
                                                                    autoComplete="location"
                                                                    className="mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Map/>
                                                    </div>
                                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className={`items-center inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${this.state.form_valid() || this.state.loading ?"bg-cyan-700 hover:bg-cyan-800": "bg-gray-300 hover:bg-gray-300"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500`}
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

export default compose(withToast, withAlert(), connect())(NewVendor)