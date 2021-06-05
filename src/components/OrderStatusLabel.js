import React from 'react';

class OrderStatusLabel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          status: this.props.status ? this.props.status: 0 ,
          label: this.props.label,
          style: this.labelStyle()
      };
    }

    labelStyle() {
        const { status } = this.props;
        switch (status) {
            case null:
                return "bg-red-100 text-red-800";
            case 0:
                return "bg-red-100 text-red-800";
            case 1:
                return "bg-blue-100 text-blue-800";
            case 2:
                return "bg-green-100 text-green-800";
            default:
        }
    }
    
    render () {
        return (
            <>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium capitalize ${this.state.style}`}>
                  {this.state.label}
                </span>
            </>
        );
    }
}
export default OrderStatusLabel;