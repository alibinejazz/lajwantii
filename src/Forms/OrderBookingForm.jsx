import React, { useEffect } from "react";
import logo from "../Images/Logo.png";
import { data, useNavigate } from "react-router-dom";
import useUpdateGoogleSheet from "../Hooks/useUpdateGoogleSheet";
import { useFormContext } from "../Context/FormContext";
import FormField from "../Components/FormField";

const OrderBookingForm = () => {
  const { formData, updateFormData, resetFormData } = useFormContext();
  const nav = useNavigate();
  const { updateGoogleSheet, isLoading, error, response } =
    useUpdateGoogleSheet();

  const handleChange = (field) => (e) => {
    updateFormData(field, e.target.value);
  };

  useEffect(() => {
    resetFormData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const dataToSend = [
      formData.customerName,
      formData.phoneNumber,
      formData.address,
      formData.email,
      formData.invoiceNumber,
      new Date().toLocaleDateString(),
      formData.items,
      formData.designCodes,
      formData.orderTakenBy,
      formData.orderHandedTo,
      formData.status,
      formData.advancePaid,
      formData.amountDue,
      formData.size,
    ];

    updateGoogleSheet(dataToSend);
    console.log(dataToSend);

    if (!error) {
      nav("/invoice");
    }
  };

  return (
    <div className="bg-[#f5f5f5] font-serif">
      <div className="flex items-center justify-center h-16 w-full mb-6">
        <img src={logo} className="w-64" alt="" />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "1700px",
          margin: "0 auto",
          padding: "2rem",
          border: "1px solid #c5a54e",
          borderRadius: "10px",
          backgroundColor: "#fdfdfd",
        }}
      >
        <h2
          style={{
            color: "#c5a54e",
            marginBottom: "1rem",
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          General Information
        </h2>
        <p
          style={{
            marginBottom: "1rem",
            fontStyle: "italic",
            color: "#666",
            textAlign: "center",
          }}
        >
          Please provide the customer's details.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <FormField
            label="Customer Name"
            value={formData.customerName}
            onChange={handleChange("customerName")}
            placeholder="Enter customer name"
          />
          <FormField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange("phoneNumber")}
            placeholder="Enter phone number"
            type="number"
          />
          <FormField
            label="Email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="Enter email address"
            type="email"
          />
          <FormField
            label="Delivery Address"
            value={formData.address}
            onChange={handleChange("address")}
            placeholder="Enter customer address"
          />
        </div>

        <h2
          style={{
            color: "#c5a54e",
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Order Details
        </h2>
        <p
          style={{
            marginBottom: "1rem",
            fontStyle: "italic",
            color: "#666",
            textAlign: "center",
          }}
        >
          Please provide the order details.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <FormField
            label="Item"
            value={formData.items}
            onChange={handleChange("items")}
            placeholder="Enter item"
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <FormField
            label="Order Number"
            value={formData.invoiceNumber}
            readOnly
            disabled
          />
          <div>
            <label
              htmlFor="size"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#666",
              }}
            >
              Size
            </label>
            <select
              id="size"
              value={formData.size}
              onChange={handleChange("size")}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #c5a54e",
                backgroundColor: "#fdfdfd",
                color: "#333",
              }}
            >
              <option value="">Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="X-Large">X-Large</option>
            </select>
          </div>
          <FormField
            label="Design Codes"
            value={formData.designCodes}
            onChange={handleChange("designCodes")}
            placeholder="Enter design codes"
          />
          <FormField
            label="Order Taken By"
            value={formData.orderTakenBy}
            onChange={handleChange("orderTakenBy")}
            placeholder="Enter order taker name"
          />
          <FormField
            label="Order Handed Over To"
            value={formData.orderHandedTo}
            onChange={handleChange("orderHandedTo")}
            placeholder="Enter the name of receiver"
          />
          <div>
            <label
              htmlFor="status"
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#666",
              }}
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange("status")}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #c5a54e",
                backgroundColor: "#fdfdfd",
                color: "#333",
              }}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Dispatched">Dispatched</option>
            </select>
          </div>
          <FormField
            label="Advance Paid"
            value={formData.advancePaid}
            onChange={handleChange("advancePaid")}
            placeholder="Enter advance amount paid"
          />
          <FormField
            label="Amount Due"
            value={formData.amountDue}
            onChange={handleChange("amountDue")}
            placeholder="Enter amount due"
          />
          
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-[#c5a54e] text-white border-none rounded-md text-base font-bold cursor-pointer mt-6"
        >
          Continue to proceed
        </button>
      </form>
    </div>
  );
};

export default OrderBookingForm;
