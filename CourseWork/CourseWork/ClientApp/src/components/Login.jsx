import axios from "axios";
import React, { useState } from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataJson = {
    "Email": "mertsalova_ak21@nuwm.edu.ua",
    "Password": "МерцаловаUu12!",
  };

  function handleSubmit(e) {
    console.log(email);
    console.log(password);
    e.preventDefault();
    axios.post("https://localhost:44308/api/User/login", dataJson)
    .then((response) => {
      console.log(response);
    });
    
  }

  return (
    <div className="d-flex flex-column m-3 align-items-center">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control m-2"
          type="email"
          onChange={(e) => {
            setEmail(e);
          }}
        />
        <input
          className="form-control m-2"
          type="password"
          onChange={(e) => {
            setPassword(e);
          }}
        />
        <button className="btn btn-primary m-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
