import React, { useRef, useState } from "react";
import { Input } from "./Generate-abiturient";
import styled from "styled-components";
import { useEffect } from "react";
import AuthService from "../services/AuthService";
import { grayFooter, headerLink } from "./utils/colors";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: [] };
  }

  componentDidMount() {
    fetch(
      `https://localhost:44308/api/User/get-current-user?email=${localStorage.getItem(
        "email"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data });
        console.log(data);
        console.log(this.state.user);
      });
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div className="w-75">
        {/* <p>{user.id}</p> */}
        <TextInput tag="Прізвище" value={user.lastName} />
        <TextInput tag="Ім'я" value={user.firstName} />
        <TextInput tag="По-батькові" value={user.middleName} />
        <TextInput tag="Кооперативна пошта" value={user.cooperativeEmail} />
      </div>
    );
  }
}

export default Profile;

const TextInput = (props) => {
  return (
    <Card className="d-flex justify-content-between align-items-center w-75 ">
      <h4>{props.tag}</h4>
      <p>{props.value}</p>
    </Card>
  );
};

const Card = styled.div`
  h4 {
    font-size: 1.1em;
  }
  p {
    font-size: 1em;
    width: 40%;
  }
  border-bottom: 2px solid ${grayFooter};
  margin: 1em;
`;
