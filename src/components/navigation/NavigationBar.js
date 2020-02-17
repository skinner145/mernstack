/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-14T16:25:34+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:12:46+00:00
 */
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends React.Component {
  //on logout remove token and email from localStorage and call onLogout function
  logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    this.props.onLogout();
  };

  render() {
    //retireve props of loggedIn
    const loggedIn = this.props.loggedIn;

    //output of nav bar with links to navigate through the app
    //some links only appear depending on whether user is logged in 
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/workouts">
          Workout App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/workouts">
              Workouts
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to="/workouts/myworkouts">
                My Workouts
              </Nav.Link>
            )}
            {loggedIn && (
              <Nav.Link as={Link} to="/workouts/create">
                Create Workout
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/exercises">
              Exercises
            </Nav.Link>
            {loggedIn && (
              <Nav.Link as={Link} to="/exercises/create">
                Create Exercise
              </Nav.Link>
            )}
            <Nav>
              {loggedIn ? (
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
