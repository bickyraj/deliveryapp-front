import React from 'react';
import {
  Link,
} from "react-router-dom";

const Setting = ({classes}) => {
    return (
        <div>
            <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-6 divide-y divide-gray-200">
                        <div className="">
                        <div>
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Settings</h2>
                            <p className="mt-1 text-sm text-gray-500">
                            Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                            </p>
                        </div>
                        <ul className="bg-white px-5 mt-2 divide-y divide-gray-200">
                            <li className="py-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <p id="privacy-option-label-1" className="text-sm font-medium text-gray-900">
                                Roles and Permissions
                                </p>
                                <p id="privacy-option-description-1" className="text-sm text-gray-500">
                                    Define roles and their permissions.
                                </p>
                            </div>
                            {/* <!-- On: "bg-teal-500", Off: "bg-gray-200" --> */}
                            <Link to="/admin/roles-and-permissions" type="button" aria-labelledby="privacy-option-label-1" aria-describedby="privacy-option-description-1" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                Go to settings
                            </Link>
                            </li>
                            <li className="py-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <p id="privacy-option-label-2" className="text-sm font-medium text-gray-900">
                                Make account private
                                </p>
                                <p id="privacy-option-description-2" className="text-sm text-gray-500">
                                Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                                </p>
                            </div>
                            {/* <!-- On: "bg-teal-500", Off: "bg-gray-200" --> */}
                            <button type="button" aria-pressed="false" aria-labelledby="privacy-option-label-2" aria-describedby="privacy-option-description-2" className="ml-4 bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                <span className="sr-only">Use setting</span>
                                {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                            </li>
                            <li className="py-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <p id="privacy-option-label-3" className="text-sm font-medium text-gray-900">
                                Allow commenting
                                </p>
                                <p id="privacy-option-description-3" className="text-sm text-gray-500">
                                Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                                </p>
                            </div>
                            {/* <!-- On: "bg-teal-500", Off: "bg-gray-200" --> */}
                            <button type="button" aria-pressed="true" aria-labelledby="privacy-option-label-3" aria-describedby="privacy-option-description-3" className="ml-4 bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                <span className="sr-only">Use setting</span>
                                {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                            </li>
                            <li className="py-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <p id="privacy-option-label-4" className="text-sm font-medium text-gray-900">
                                Allow mentions
                                </p>
                                <p id="privacy-option-description-4" className="text-sm text-gray-500">
                                Adipiscing est venenatis enim molestie commodo eu gravid
                                </p>
                            </div>
                            {/* <!-- On: "bg-teal-500", Off: "bg-gray-200" --> */}
                            <button type="button" aria-pressed="true" aria-labelledby="privacy-option-label-4" aria-describedby="privacy-option-description-4" className="ml-4 bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-blue-500">
                                <span className="sr-only">Use setting</span>
                                {/* <!-- On: "translate-x-5", Off: "translate-x-0" --> */}
                                <span aria-hidden="true" className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;