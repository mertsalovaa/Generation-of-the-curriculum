import React, { useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo_icon from "./images/logo.svg";
import {
  colorHoverHeader,
  headerLink,
  headerTextStyle,
  langColor,
  lightGray,
  mainColor,
  visible,
} from "./utils/colors";
import { device, FontInterSBold } from "./utils/styling-partial";
import AuthService from "../services/AuthService";
import "../custom.css";
import { Toaster, toast } from "react-hot-toast";

export const Header = () => {
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // setToken(JSON.stringify(localStorage.getItem("token")));
    setCurrentUser(localStorage.getItem("email"));
  }, [currentUser]);

  // window.onload = () => {
  //   if (token.length === 4 || token === null) {
  //     console.log(token);
  //     document.getElementById("logout").style = "display: none !important;";
  //   } else {
  //     document.getElementById("login").style = "display: none !important;";
  //   }
  // };

  const logout = () => {
    toast.success("Ви вийшли.");
    localStorage.removeItem("email");
    window.location.replace("./");
  };

  return (
    <NavbarDiv expand="lg">
      <Container fluid>
        <Navbar.Brand href="./">
          <Logo src={logo_icon} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Menu className="w-100">
            <div className="w-100 d-flex justify-content-between align-items-center me-lg-0 me-xl-4 m-0">
              {currentUser == null ? (
                <></>
              ) : (
                <>
                  <HeaderLink to="/client/subjects">Твої предмети</HeaderLink>
                  <HeaderLink to="/client/classmates">
                    Твої одногрупники
                  </HeaderLink>
                  <HeaderLink to="/profile">Твій профіль</HeaderLink>
                  {/* <Lang>
                    Укр <span>/ Eng</span>
                  </Lang> */}
                  <HeaderLink to={""} onClick={logout}>
                    Вийти
                  </HeaderLink>
                </>
              )}
              {/* <Link id="login" to={"/login"}>
                <SignInBtn>Увійти</SignInBtn>
              </Link> */}
            </div>
          </Menu>
        </Navbar.Collapse>
      </Container>
      <Toaster />
    </NavbarDiv>
  );
};

const NavbarDiv = styled(Navbar)`
  box-shadow: 0px 1px 4px #004a7180;
  position: sticky;
`;

const SignInBtn = styled.button`
  color: ${mainColor};
  background-color: ${lightGray};
  font-weight: 600;
  border-radius: 1.56em;
  box-shadow: 0px 0px 4px rgba(147, 147, 147, 0.2);
  padding: 0.35em 2em;
  border: 1px solid #d4d4d4;

  &:hover {
    background-color: transparent;
  }

  @media ${device.mobileS} {
    margin: 0.8em;
  }
`;

const Lang = styled.p`
  ${FontInterSBold};
  font-weight: 600;
  font-size: 1em;
  color: ${mainColor};
  margin-bottom: 0;

  span {
    color: ${langColor};
  }
  &:hover {
    cursor: pointer;
    text-shadow: 0 1px 1px #00283d80;
  }
  @media ${device.mobileS} {
    margin: 0.8em;
  }
`;
const HeaderLink = styled(Link)`
  ${headerTextStyle};
`;
const Text = styled.p`
  ${headerTextStyle};
  font-size: 1.1em !important;
`;
const Logo = styled.img`
  height: 3em;
  margin: 0 6em;
`;
const Menu = styled(Nav)`
  margin-right: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
  margin: 0 6em 0 0;

  div {
    @media ${device.mobileS} {
      display: flex;
      flex-direction: column;
      margin-top: 0.4em;
    }
    @media ${device.mobileM} {
      display: flex;
      flex-direction: column;
      margin-top: 0.4em;
    }
    @media ${device.tablet} {
      display: flex;
      flex-direction: row;
    }
    @media ${device.laptop} {
      display: flex;
      flex-direction: row;
    }
    @media ${device.laptopL} {
      display: flex;
      flex-direction: row;
    }
  }
`;
