import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../../App";
import { Container } from "react-bootstrap";
import styled, { css } from "styled-components";
import { FontInterSBold } from "../utils/styling-partial";
import { headerLink } from "../utils/colors";
import { useSearchParams } from "react-router-dom";

export default class SubjectInfo extends React.Component {
  // let { name } = useParams();
  // const [subject, setSubject] = useState({});
  // const [teachers, setTeachers] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_URL}/get-subject-info?subjectName=${name}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSubject(data);
  //       setTeachers(data.teachers);
  //     });
  // }, [subject, teachers]);
  constructor(props) {
    super(props);
    this.state = { subject: {}, teachers: [] };
  }

  componentDidMount() {
    // console.log(window.location.href.split("/"));
    // let { name } = useParams();
    // console.log(this.state.name);
    // this.setState({ name: this.props.match.params.name });

    fetch(
      `${API_URL}/get-subject-info?subjectName=${localStorage.getItem(
        "subject"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ subject: data });
        this.setState({ teachers: data.teachers });
      });
  }

  render() {
    localStorage.setItem("subject", this.props.match.params.name);
    const { subject, teachers } = this.state;
    return (
      <Container className="d-flex flex-column align-items-center pb-5 pt-2">
        <Custtext className="d-flex align-items-center">
          <h5>Предмет:</h5>
          <p>{subject.name}</p>
        </Custtext>
        <Custtext className="d-flex ">
          <h5>Опис:</h5>
          <p>{subject.description}</p>
        </Custtext>
        <Custtext className="d-flex align-items-center">
          <h5>Тип:</h5>
          <p>{subject.formOfControl}</p>
        </Custtext>
        <Custdiv className="row d-flex justify-content-between">
          <span className="col d-flex align-items-center">
            <h5>Кредити:</h5>
            <p>{subject.credits}</p>
          </span>
          <span className="col d-flex align-items-center">
            <h5>Лекції:</h5>
            <p>{subject.lectures}</p>
          </span>
          <span className="col d-flex align-items-center">
            <h5>Лабораторні:</h5>
            <p>{subject.labworks}</p>
          </span>
          <span className="col d-flex align-items-center m-0">
            <h5>Практичні:</h5>
            <p>{subject.practical}</p>
          </span>
        </Custdiv>
        <Custtext>
          <span className="d-flex">
            <h5>Викладачі: </h5>
            <TeacherSpan className="d-flex flex-column">
              {teachers.map((item) => (
                <Link
                  key={item.lastName}
                  to={`/client/teacher-info/${item.cooperativeEmail}`}
                >
                  {item.lastName} {item.firstName} {item.middleName}
                </Link>
              ))}
            </TeacherSpan>
          </span>
        </Custtext>
      </Container>
    );
  }
}

const TeacherSpan = styled.span`
  line-height: 1.2em;
margin-left: 0.5em;
  a {
    color: ${headerLink};
    font-weight: 400;
    padding-left: 0.5em;
    padding-bottom: 0.5em;
    font-size: 0.9em;
    &:hover {
      text-decoration: none;
      font-weight: 500;
    }
  }
`;

const styleInput = css`
  ${FontInterSBold};
  width: 80%;
  padding: 1.5em;
  margin: 0.5em;
  color: ${headerLink};
  box-shadow: 0px 0px 5px -2px #d4d4d4fc;
  border-radius: 1.5em;

  h5 {
    font-weight: 600;
    font-size: 0.95em !important;
    margin: 0;
    min-width: 4.5em;
  }
  p {
    font-size: 0.95em !important;
    font-weight: 400;
    margin: 0;
    margin-left: 1em;
  }
`;

const Custtext = styled.span`
  ${styleInput};
  min-width: 100px !important;
`;
const Custdiv = styled.div`
  ${styleInput};
  padding-left: 0.55em !important;
  padding-right: 0.55em !important;
  span {
    margin: 0 !important;
  }
`;
