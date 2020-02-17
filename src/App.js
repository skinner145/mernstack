/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-03T14:22:36+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T13:06:37+00:00
 */
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExerciseList from './components/exercises/ExerciseList';
import CreateExercise from './components/exercises/CreateExercise';
import ViewExercise from './components/exercises/ViewExercise';
import EditExercise from './components/exercises/EditExercise';

import WorkoutList from './components/workouts/WorkoutList';
import CreateWorkout from './components/workouts/CreateWorkout';
import ViewWorkout from './components/workouts/ViewWorkout';
import EditWorkoutExercise from './components/workouts/EditWorkoutExercise';
import PersonalWorkouts from './components/workouts/PersonalWorkouts'

import Login from './components/auth/Login';
import Register from './components/auth/Register'

import NavigationBar from './components/navigation/NavigationBar';

import { Container, Row, Col } from 'react-bootstrap';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null,
    };
  }

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false: true
    }));
  }

  render(){

    const loggedIn = this.state.loggedIn
    return(
      <Router>
        <NavigationBar loggedIn={loggedIn} onLogout={this.authHandler} />
        <br />
        <Container>
          <Row>
            <Col sm={2}>
            </Col>
            <Col sm={8}>
              <Switch>
                <Route exact path="/" component={WorkoutList} />


                <Route exact path="/workouts" exact component={WorkoutList} />
                <Route exact path="/workouts/myworkouts" component={PersonalWorkouts} />
                <Route exact path="/workouts/create" component={loggedIn ? CreateWorkout : Login} />

                <Route exact path="/workouts/:id" component ={ViewWorkout} />
                <Route exact path="/workouts/:wid/exercises/:eid" component={loggedIn ? EditWorkoutExercise : Login} />

                <Route exact path="/exercises" exact component={ExerciseList} />
                <Route exact path ="/exercises/create" component={loggedIn ? CreateExercise : Login} />

                <Route exact path="/exercises/:id" component = {ViewExercise} />
                <Route exact path = "/exercises/:id/edit"  component={loggedIn ? EditExercise : Login}  />

                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
            </Col>
            <Col sm={2}>
            </Col>
          </Row>
        </Container>

      </Router>
    )
  }
}

export default App;
