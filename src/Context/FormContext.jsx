import React, { createContext, useState, useContext, useEffect } from "react";

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const FormProvider = ({ children }) => {
  const generateInvoiceNumber = () => {
    const randomFourDigits = generateRandomNumber(1000, 9999);
    return `INV-${randomFourDigits}`;
  };

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    orderNumber: "",
    orderTakenBy: "",
    items: "",
    bookingDate: "",
    invoiceNumber: generateInvoiceNumber(),
    orderHandedTo: "",
    status: "",
    advancePaid: "",
    amountDue: "",
    size: "",
    deliveryDate:"",
    invoicebase64:"",
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetFormData = () => {
    setFormData({
      customerName: "",
      email: "",
      phoneNumber: "",
      address: "",
      orderNumber: "",
      orderTakenBy: "",
      items: "",
      bookingDate: "",
      invoiceNumber: generateInvoiceNumber(),
      orderHandedTo: "",
      status: "",
      advancePaid: "",
      amountDue: "",
      size: "",
      deliveryDate:"",
      invoicebase64:""
    });
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, setFormData, resetFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};
