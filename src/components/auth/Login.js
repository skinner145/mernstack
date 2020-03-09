/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T16:02:44+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T16:16:08+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //variables will be set later
    this.state = {
      email: '',
      password: ''
    };

  }
  //when email cahnges set to email state
  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  //when password changes set to password state
  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  //onSubmit
  onSubmit(e){
    e.preventDefault();
    //object made up of email and password state
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    //axios post with user object passed through
    axios.post(process.env.REACT_APP_API_URL + '/account/login', user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('jwtToken', res.data.token);
      })
      .catch((err) => {
        if(err.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
      //store email in localStorage
      localStorage.setItem('email', this.state.email)
      window.location = '/';
  }
  render() {
    //form for login
    return (
    <div>
      <h3>Login/<Link to="/register">Register</Link></h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Group as={Row} controlId="formHorizontalIMDB">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email"
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
            <Form.Control type="password" placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
    )
  }
}
