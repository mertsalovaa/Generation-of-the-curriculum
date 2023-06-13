import React, { useRef, useState } from "react";
import { API_URL } from "../App";
import { data } from "jquery";
import styled from "styled-components";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import {
  grayFooter,
  headerLink,
  lightMainColor,
  mainColor,
} from "./utils/colors";
import { Toaster, toast } from "react-hot-toast";

// mertsalova_ak21@nuwm.edu.ua
// МерцаловаUu12!

export function Login() {
  // const [email, setEmail] = useState("");
  // const [validEmail, setValidEmail] = useState("");
  const email = useRef("");
  const validEmail = useRef("");
  const validPassword = useRef("");
  const password = useRef("");
  const [showPassword, setShowPassword] = useState("");

  function handleSubmit(e) {
    const dataJson = {
      Email: email.current.value,
      Password: password.current.value,
    };
    console.log(dataJson);
    e.preventDefault();
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataJson),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("email", dataJson.Email);
          window.location.replace("./profile");
        } else {          
          toast.error(
            `${response.message} ${response.status}\n${response.errors[0]}`
          );
        }
      });
  }

  function validateEmail() {
    const span = document.querySelector(".validEmail");
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.current.value.length === 0) {
      validEmail.current = "Електронна пошта пуста";
    } else if (
      !email.current.value ||
      reg.test(email.current.value) === false
    ) {
      validEmail.current = "Електронна пошта некоректна";
      span.style.color = "#DC143C";
    } else {
      validEmail.current = "Електронна пошта коректна";
      span.style.color = "#228B22";
    }
    span.innerHTML = validEmail.current;
  }

  function validatePassword() {
    let span = document.querySelector(".validPassword");
    console.log(password.current.value);
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{6,}/;
    const passwordLength = password.current.value.length;
    const uppercasePassword = uppercaseRegExp.test(password.current.value);
    const lowercasePassword = lowercaseRegExp.test(password.current.value);
    const digitsPassword = digitsRegExp.test(password.current.value);
    const specialCharPassword = specialCharRegExp.test(password.current.value);
    const minLengthPassword = minLengthRegExp.test(password.current.value);

    if (passwordLength === 0) {
      validPassword.current = "Пароль пустий";
      span.style.color = "#DC143C";
    } else if (!uppercasePassword) {
      validPassword.current = "У паролі має бути хоча б одна велика літера";
      span.style.color = "#DC143C";
    } else if (!lowercasePassword) {
      validPassword.current = "У паролі має бути хоча б одна маленька літера";
      span.style.color = "#DC143C";
    } else if (!digitsPassword) {
      validPassword.current = "У паролі має бути хоча б одне число";
      span.style.color = "#DC143C";
    } else if (!specialCharPassword) {
      validPassword.current = "У паролі має бути хоча б один символ";
      span.style.color = "#DC143C";
    } else if (!minLengthPassword) {
      validPassword.current = "Мінімальна довжина паролю – 6";
      span.style.color = "#DC143C";
    } else {
      validPassword.current = "Пароль коректний";
      span.style.color = "#228B22";
    }
    span.innerHTML = validPassword.current;
  }

  return (
    <div className="d-flex flex-column m-3 align-items-center">
      <Title>Увійти</Title>
      <form className="w-25 d-flex flex-column" onSubmit={handleSubmit}>
        <CustomTextInput className={`d-flex flex-column align-items-start`}>
          <input
            type="email"
            placeholder={"Email"}
            onChange={(e) => {
              validateEmail(e);
            }}
            ref={email}
          />
          <ValidSpan className="validEmail"> </ValidSpan>
        </CustomTextInput>
        <CustomPasswordInput className={` d-flex justify-content-between`}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            onChange={(e) => {
              validatePassword(e);
            }}
            ref={password}
            required
          />
          <span onClick={() => setShowPassword((prevState) => !prevState)}>
            {showPassword ? <BsEye /> : <BsEyeSlash />}
          </span>
        </CustomPasswordInput>
        <ValidSpan className="validPassword"> </ValidSpan>
        <Toaster />
        <SubmitButton type="submit">Підтвердити</SubmitButton>
      </form>
    </div>
  );
}

const ValidSpan = styled.span`
  font-size: 0.9em;
  padding: 0.5em;
  font-weight: 550;
`;

const Title = styled.p`
  color: ${headerLink};
  font-size: 1.2em;
  padding-top: 1em;
  font-weight: 600;
`;

const SubmitButton = styled.button`
  width: 50%;
  padding: 0.5em 1.2em;
  margin: 0.5em;
  background-color: ${headerLink};
  color: ${grayFooter};
  font-size: 1em;
  border: 1px solid transparent;
  border-radius: 1.1em;
  font-weight: 600;
  &:hover {
    background-color: transparent;
    border: 1px solid ${headerLink};
    color: ${headerLink};
  }
`;

const CustomPasswordInput = styled.div`
  width: 99%;
  border: 1px solid ${lightMainColor};
  border-radius: 25px;
  padding: 1em;
  background-color: transparent;
  color: ${mainColor};
  margin: 0.35em;
  font-size: 1em;
  input {
    color: ${mainColor};
    border: none;
    outline: none;
    width: 90%;

    &::placeholder {
      font-style: italic;
      color: ${lightMainColor};
    }
  }
  span {
    cursor: pointer;
  }
`;

const CustomTextInput = styled.div`
  width: 100%;
  input {
    border: 1px solid ${lightMainColor};
    border-radius: 25px;
    padding: 1em 1.3em;
    background-color: transparent;
    color: ${mainColor};
    margin: 0.35em 0;
    width: 100% !important;
    font-size: 1em;
    outline: none;

    &::placeholder {
      font-style: italic;
      color: ${lightMainColor};
    }
  }
  p {
    color: #8c8c8c;
    margin: 0.1em;
  }
  img {
    &:hover {
      cursor: pointer;
    }
  }
`;
