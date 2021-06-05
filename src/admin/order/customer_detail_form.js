import React from 'react';
import {StepFormContext} from './step_form-context';

class CustomerDetailForm extends React.Component {
    static contextType = StepFormContext;
    constructor(props, context) {
        super(props, context);
        this.state = {
            form_valid: () => {
                if (this.state.form.full_name !== "" && this.state.form.mobile !== "" && this.state.form.address !== "") {
                    return true;
                }
                return false;
            },
            step: 1,
            form: this.context.customer_detail
                ? this.context.customer_detail
                : {
                    full_name: "",
                    email: "",
                    mobile: "",
                    address: ""
                }
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
        this.context.customer_detail = this.state.form;
        this.context.step = 2;
        this
            .props
            .changeStep();
    }

    render() {
        return (
            <StepFormContext.Consumer>
                {({stepForm}) => (
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
                                                        Full name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="full_name"
                                                        value={this.state.form.full_name}
                                                        onChange={this.handleChange}
                                                        id="first_name"
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
                                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                                        Mobile Number *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        id="mobile"
                                                        value={this.state.form.mobile}
                                                        onChange={this.handleChange}
                                                        autoComplete="phone"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                                </div>

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                        Address *
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
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit"
                                                className={`items-center inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${this.state.form_valid()?"bg-indigo-700 hover:bg-indigo-800": "bg-gray-300 hover:bg-gray-300"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                disabled={!this.state.form_valid()}
                                                >
                                                Continue <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </StepFormContext.Consumer>
        );
    }
}
export default CustomerDetailForm;