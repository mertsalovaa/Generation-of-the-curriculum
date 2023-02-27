import React, { Component } from "react";
import axios from "axios";
import photo from "./images/main-photos.png";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";
import { FontInterSBold } from "./utils/styling-partial";
import { lightMainColor, mainColor } from "./utils/colors";

export class Home extends React.Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  // componentDidMount() {
  //   axios.get("https://localhost:44308/api/User/get").then((response) => {
  //     console.log(response.data);
  //     this.setState({
  //       users: response.data,
  //     });
  //   });
  // }

  render() {
    return (
      <Row className="w-100 m-0">
        <MyCol
          xs={6}
          md={4}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <p>Знаходь тут відповіді на свої питання</p>
          <MyHr />
          <BeginBtn>Розпочати</BeginBtn>
        </MyCol>
        <Col xs={12} md={8} className="p-0">
          <MainImg src={photo} alt="img" />
        </Col>
      </Row>
    );
  }
}

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
