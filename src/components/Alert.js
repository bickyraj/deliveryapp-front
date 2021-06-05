import React from 'react';

const Alert = ({style, options, message, close }) => {
    return (
        <div style={style} className="h-80 py-8">
            <div className="relative mx-auto flex justify-center sm:justify-end h-full">
                <div role="alert" className="xl:w-5/12 mx-auto sm:mx-0 sm:w-6/12 md:w-3/5 w-11/12 bg-white dark:bg-gray-800 shadow-lg rounded flex sm:flex-row flex-col pr-4 absolute left-0 sm:left-auto right-0 sm:top-0 sm:mr-6 transition duration-150 ease-in-out" id="notification">
                    <div className="sm:px-6 px-4 mt-4 sm:mt-0 flex items-center sm:justify-center sm:border-r dark:border-gray-700 border-gray-300 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                            <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                        </svg>
                    </div>
                    <div className="flex flex-col justify-center pl-4 sm:w-9/12 py-3">
                        <p className="text-lg text-gray-800 dark:text-gray-100 font-semibold pb-1">{options.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-normal pb-2">{message}</p>
                        <div className="flex">
                            <span className="text-sm text-green-400 font-bold mr-2 cursor-pointer" onClick={options.onConfirm}>Yes </span>
                            <span className="text-sm pl-2 text-gray-600 dark:text-gray-400 cursor-pointer" onClick={close}>Dismiss</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Alert;