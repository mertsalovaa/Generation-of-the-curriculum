import React, { Component } from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { FontInter } from "./utils/styling-partial";

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header />
        <Body>{this.props.children}</Body>
        <Footer />
      </div>
    );
  }
}

const Body = styled.div`
  min-height: 55.6vh;
  ${FontInter};
`;
