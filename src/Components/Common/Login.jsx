import React, { useState } from "react";
import "./Login.css";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (y) => {
    y.preventDefault();

    const loginne = {
      email,
      password,
    };
    fetch("http://localhost:3000/loginne", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginne),
    }).then(() => {
      console.log("Login submitted");
    });
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
