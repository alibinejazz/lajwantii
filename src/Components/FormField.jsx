import React from "react";

const FormField = ({ label, type = "text", value, onChange, placeholder, readOnly = false, required, disabled,  pattern, title}) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{ display: "block", marginBottom: "0.5rem", }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{
        width: "100%",
        padding: "0.8rem",
        border: "1px solid #d1b035",
        borderRadius: "10px",
        appearance:"textarea"
        
      }}
      required      
      disabled={disabled}
      title={title}
      pattern={pattern}
    />
  </div>
);

export default FormField;
