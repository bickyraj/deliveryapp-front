import React from 'react';
import {StepFormContext} from './step_form-context';

class StepLayout extends React.Component {
    static contextType = StepFormContext;
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle(e, step) {
        e.preventDefault();
        this.context.step = step;
        this.props.changeStep();
    }
    render() {
        return (
            <StepFormContext.Consumer>
                {({step}) => (
                    <div>
                        <div className="hidden sm:block">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="pt-6 divide-y divide-gray-200">
                                    <div className="">
                                        <div>
                                            <h2 className="mb-3 text-lg leading-6 font-medium text-gray-900">#New Order</h2>
                                            {/* <p className="mt-1 text-sm text-gray-500">
                                            Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                                            </p> */}
                                        </div>
                                        <div className="flex py-5 px-5 flex-col">
                                            <ul className="flex justify-center">
                                                <li onClick={(e) => {this.toggle(e, 1)}} className={`flex text-sm font-medium ${step === 1 ? "text-indigo-600" : "text-green-500"} items-center mr-7 cursor-pointer`}>
                                                    <div className={`flex h-7 w-7 items-center justify-center mr-3 rounded-full text-white ${step === 1 ? "bg-indigo-600" : "bg-green-500"}`}>1</div>
                                                    Delivery Details
                                                    <div className={`h-0.5 w-10 ml-7 ${step === 1 ? "bg-gray-300" : "bg-green-500"} rounded-md`}></div>
                                                </li>
                                                <li className={`flex text-sm font-medium ${step === 2 ? "text-indigo-600" : "text-gray-300"} items-center cursor-pointer`}>
                                                    <div className={`flex h-7 w-7 items-center justify-center mr-3 rounded-full text-white ${step === 2 ? "bg-indigo-600" : "bg-gray-300"}`}>2</div>
                                                    Items</li>
                                            </ul>
                                        </div>
                                        <>{this.props.children}</>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </StepFormContext.Consumer>
        );
    }
}
export default StepLayout;