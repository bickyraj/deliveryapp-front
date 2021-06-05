import React from 'react';

export const stepForm = {
    step: 1,
    customer_detail: {
        full_name: "",
        email: "",
        mobile: "",
        address: ""
    },
    itemList: [],
    setStep: (step) => {},
    toggleStep: () => {}
};

export const StepFormContext = React.createContext(
  stepForm // default value
);