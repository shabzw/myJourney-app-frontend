import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    if (credentials.password !== credentials.cpassword) {
      return props.showAlert("Passwords don't match", "danger");
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);

      navigate("/");

      props.showAlert("Account created Successfully!!", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-2">
      <h1>SignUp to continue to myJourney</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlfor="name"
            className="form-label"
            style={{ marginTop: "15px" }}
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            aria-describedby="emailHelp"
          />

          <label
            htmlfor="email"
            className="form-label"
            style={{ marginTop: "15px" }}
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlfor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div>
          <label htmlfor="cpassword" className="form-label">
            Comfirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginBottom: "15px", marginTop: "15px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
