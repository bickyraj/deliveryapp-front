import React from 'react';
import _ from 'lodash';
import { API_URL } from '../helpers/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

class Paginator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0,
            fromPage: 0,
            toPage: 0,
            total: 0,
            lastPage: 0,
            prevPageUrl: "", 
            nextPageUrl: "", 
        }
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: nextProps.paginate?.data?.current_page,
            lastPage: nextProps.paginate?.data?.last_page,
            fromPage: nextProps.paginate?.data?.from,
            toPage: nextProps.paginate?.data?.to,
            total: nextProps.paginate?.data?.total,
            prevPageUrl: nextProps.paginate?.data?.prev_page_url,
            nextPageUrl: nextProps.paginate?.data?.next_page_url,
        });
    }

    handlePageChange = _.debounce(function(e, page = null) {
        if (page === true && (this.state.currentPage < this.state.lastPage)) {
            page = this.state.currentPage + 1;
        } else if(page === false && (this.state.currentPage > 1)) {
            page = this.state.currentPage - 1;
        }  else {
            let key = parseInt(e.target.dataset.key) + 1;
            page =  key > 0 ? key: this.state.currentPage;
        }
        this.setState({currentPage: page});
        this.props.onPageChange(this.state.currentPage);
    }, 500);

    listPageNumber() {
        const listPageNumber = [];
        for (var i = 0; i < this.state.lastPage; i++) {
          listPageNumber.push(
              <button  onClick={(e) => this.handlePageChange(e)}  data-key={i} aria-current="page" className={`${((i+1) === this.state.currentPage)? "z-10 bg-cyan-50 border-cyan-500 text-cyan-600":"bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}> {i+1} </button>
          );
        }

        return listPageNumber;
    }
    
    render() {
        return(
            <>
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <a href="/"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a href="/"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{this.state.fromPage}</span> to <span className="font-medium">{this.state.toPage}</span> of {' '}
                        <span className="font-medium">{this.state.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button onClick={(e) => this.handlePageChange(e, false)}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* Current: "z-10 bg-cyan-50 border-cyan-500 text-cyan-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        {this.listPageNumber()}
                        {/* <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span> */}
                        <button  onClick={(e) => this.handlePageChange(e, true)}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
            </>
        );
    }
}
export default Paginator;