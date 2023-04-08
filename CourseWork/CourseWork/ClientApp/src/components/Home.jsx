import React, { Component, useRef, useState } from "react";
import axios from "axios";
import photo from "./images/main-photo.png";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { FontInterSBold } from "./utils/styling-partial";
import { lightMainColor, mainColor } from "./utils/colors";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    name: "Автоматики, кібернетики та обчислювальної техніки",
    value: "ak",
  },
  {
    id: 2,
    name: "Водного господарства та природооблаштування",
    value: "vgp",
  },
  {
    id: 3,
    name: "Будівництва та архітектури",
    value: "ba",
  },
  {
    id: 4,
    name: "Агроекології та землеустрою",
    value: "az",
  },
  {
    id: 5,
    name: "Механічний",
    value: "mi",
  },
  {
    id: 6,
    name: "Права",
    value: "pr",
  },
  {
    id: 7,
    name: "Економіки та менеджменту",
    value: "em",
  },
  {
    id: 8,
    name: "Охорони здоров'я",
    value: "oz",
  },
];

export function Home() {
  const lastName = useRef(null);
  const firstName = useRef(null);
  const phone = useRef(null);
  const fatherName = useRef(null);
  const [institute, setInstitute] = useState("");

  function formSubmit() {
    axios
      .get(
        `https://localhost:44308/api/User/generate-abiturient?lastName=${lastName.current.value}&firstName=${firstName.current.value}&institute=${institute}`
      )
      .then((response) => {
        if (response.status === 200) {
          document.querySelector(".email-text").innerText =
            "Електронна адреса: " + response.data.email;
          document.querySelector(".password-text").innerText =
            "Тимчасовий пароль: " + response.data.password;
        }
      });
  }
  const handleChange = (e) => {
    setInstitute(e.target.value);
  };

  return (
    <Row className="w-100 m-0">
      <Col xs={12} md={8} className="p-0">
        <MainImg src={photo} alt="img" />
      </Col>
      <MyCol
        xs={6}
        md={4}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <p>Знаходь тут відповіді на свої питання</p>
        <MyHr />
        <BeginBtn className="m-3">Розпочати</BeginBtn>
        <Link to={"/generate-abiturient"}>
          <BeginBtn className="m-3">Генерація абітурієнта</BeginBtn>
        </Link>
      </MyCol>
    </Row>
  );
}

const EmailText = styled.p`
  color: #000 !important;
  font-size: 1.35em !important;
`;

const MyHr = styled.hr`
  border: none;
  border-top: 2px solid ${mainColor};
  overflow: visible;
  text-align: center;
  height: 5px;
  width: 75%;
`;

const MainImg = styled.img`
  width: 100%;
  padding: 0;
`;

const MyCol = styled(Col)`
  ${FontInterSBold};

  p {
    color: ${mainColor};
    font-size: 2em;
    width: 11em;
    margin-left: 2em;
  }
`;

const BeginBtn = styled.button`
  border-radius: 1.56em;
  padding: 0.35em 2.2em;
  font-weight: 600;
  border: 2px solid ${lightMainColor};
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(63, 96, 152, 0.2);
  color: ${mainColor};
  font-size: 1em;

  &:hover {
    background-color: ${mainColor};
    color: #ffffff;
  }
`;

{
  /* <div className="m-4">
          <input  type="text" id="lastName" ref={lastName} />
          <input type="text" id="firstName" ref={firstName} />
          <input type="text" id="fatherName" ref={fatherName} />
          <input type="number" id="phone" ref={phone} />
          <select value={institute} onChange={handleChange}>
            <option defaultChecked>Вибрати інститут</option>
            {data.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-dark" onClick={formSubmit}>
          Submit
        </button>
        <div>
          <EmailText className="email-text"></EmailText>
          <EmailText className="password-text"></EmailText>
        </div> */
}
