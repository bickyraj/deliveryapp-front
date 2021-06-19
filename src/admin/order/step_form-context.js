import React from 'react';

export const stepForm = {
    step: 1,
    customer_detail: {
        full_name: "",
        email: "",
        mobile: "",
        address: "",
        delivery_date: ""
    },
    itemList: [],
    setStep: (step) => {},
    toggleStep: () => {}
};

export const StepFormContext = React.createContext(
  stepForm // default value
);