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
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form className="inputs" onSubmit={handleSubmit}>
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            value={email}
            onChange={(y) => setEmail(y.target.value)}
            placeholder="Email Id"
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            value={password}
            onChange={(y) => setPassword(y.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="forgot-password">
          Forgot password?<span>Click Here!</span>
        </div>

        <div className="submit-container">
          <button>Login </button>
        </div>
      </form>
    </div>
  );
};
