import React from 'react';
import ItemsForm from './items';
import StepLayout from './step_layout';
import CustomerDetailForm from './customer_detail_form';
import { StepFormContext, stepForm } from './step_form-context';

class NewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.toggleStep = () => {
          this.setState({step: this.state.step});
        };
        
        this.state = {
            step: stepForm.step,
            form: stepForm.customer_detail,
            toggleStep: this.toggleStep
        };
    }

    renderSwitch() {
        const {step} = this.state;
        switch (step) {
            case 1:
                return <StepLayout step={step} changeStep={this.toggleStep}>
                    <CustomerDetailForm changeStep={this.toggleStep}></CustomerDetailForm>
                </StepLayout>
            case 2:
                return <StepLayout step={step} changeStep={this.toggleStep}>
                    <ItemsForm></ItemsForm>
                </StepLayout>
            default:
        }
    }

    render() {
        return (<StepFormContext.Provider value={this.state}>
                {this.renderSwitch()}
        </StepFormContext.Provider>)
    }
}

export default NewOrder;