import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Make sure this contains .input-error CSS

function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // VALIDATION FUNCTION
  const validate = (values) => {
    let err = {};

    if (!values.firstName.trim()) err.firstName = "First Name is required";
    if (!values.lastName.trim()) err.lastName = "Last Name is required";
    if (!values.username.trim()) err.username = "Username is required";

    if (!/\S+@\S+\.\S+/.test(values.email))
      err.email = "Invalid email format";

    if (values.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!/^\d{10}$/.test(values.phone))
      err.phone = "Phone must be 10 digits";

    if (!values.countryCode.trim())
      err.countryCode = "Country Code required";

    if (!values.country.trim()) err.country = "Country required";
    if (!values.city.trim()) err.city = "City required";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(values.pan))
      err.pan = "Invalid PAN format";

    if (!/^\d{12}$/.test(values.aadhaar))
      err.aadhaar = "Aadhaar must be 12 digits";

    return err;
  };

  // HANDLE INPUT CHANGE + LIVE VALIDATION
  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);
    setErrors(validate(updatedForm)); // Validate continuously
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);

    // Mark all fields touched on submit
    const allTouched = Object.keys(form).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/details", { state: form });
    } else {
      setErrors(validationErrors);
    }
  };

  const isFormValid = Object.keys(validate(form)).length === 0;

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>React Registration Form</h2>

      <form onSubmit={handleSubmit}>
        {/* AUTO GENERATED INPUT FIELDS */}
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "username", label: "Username" },
          { name: "email", label: "Email" },
          { name: "countryCode", label: "Country Code" },
          { name: "phone", label: "Phone Number" },
          { name: "country", label: "Country" },
          { name: "city", label: "City" },
          { name: "pan", label: "PAN" },
          { name: "aadhaar", label: "Aadhaar" },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "10px" }}>
            <label>{field.label}</label>

            <input
              type="text"
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, [field.name]: true })}
              className={
                touched[field.name] && errors[field.name] ? "input-error" : ""
              }
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />

            {touched[field.name] && errors[field.name] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors[field.name]}
              </span>
            )}
          </div>
        ))}

        {/* PASSWORD FIELD */}
        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={() => setTouched({ ...touched, password: true })}
              className={
                touched.password && errors.password ? "input-error" : ""
              }
              style={{ flex: 1, padding: "8px" }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ marginLeft: "5px" }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {touched.password && errors.password && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.password}
            </span>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            width: "100%",
            padding: "10px",
            background: isFormValid ? "blue" : "gray",
            color: "white",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;