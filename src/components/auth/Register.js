/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T15:53:24+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:48:43+00:00
 */
import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //variables will be set later
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }
  //when first name changes set to firstName state
  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  //when last name changes set to lastName state
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  //when email changes set to email state
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  //when password changes set to Password
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  //when form submitted
  onSubmit(e) {
    e.preventDefault();
    //object made up of firstName, lastName, email, password
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    //axios post with user object passed
    axios
      .post(process.env.REACT_APP_API_URL + "/account/register", user)
      .then(res => {
        localStorage.setItem("jwtToken", res.data.token);
        console.log(res.data);
      })
      .catch(err => {
        if (err.response.status === 401) {
          this.setState({
            message: "Login failed. Username or password not match"
          });
        }
      });
    //store email in local storage
    localStorage.setItem("email", this.state.email);
    window.location = "/";
  }

  render() {
    //form for register
    return (
      <div>
        <h3>
          Register/<Link to="/login">Login</Link>
        </h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
                onChange={this.onChangeFirstName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.onChangeLastName}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Register</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
