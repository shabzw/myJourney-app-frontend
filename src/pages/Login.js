import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingGIF from "../assets/loading.gif";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //API call to login user and receive valid response
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("userId", json.userId);
      setLoading(false);
      props.showAlert("Logged In Successfully", "success");

      navigate("/");
    } else {
      props.showAlert("Invalid Credentials", "danger");
      setLoading(false);
      //navigate back to login page if invalid credentials
      navigate("/login");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-2">
      {/* Display loading GIF until a valid response is received */}
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            className=""
            style={{ width: "30%" }}
            src={loadingGIF}
            alt="Loading..."
          />
          <div>Please Wait</div>
        </div>
      ) : (
        // Rest of your content goes here
        <div>
          <h1>Login to continue to myJourney</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlfor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
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
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
