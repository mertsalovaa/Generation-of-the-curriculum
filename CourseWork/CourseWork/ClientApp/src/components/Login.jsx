import React, { useState } from "react";
import AuthService from "../services/AuthService";
import { API_URL } from "../App";
import { data } from "jquery";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataJson = {
    Email: "mertsalova_ak21@nuwm.edu.ua",
    Password: "МерцаловаUu12!",
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("email", dataJson.Email);
        }
      });

    window.location.replace("./profile");
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
