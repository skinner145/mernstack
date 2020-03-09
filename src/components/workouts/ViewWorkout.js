/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-12T12:02:20+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:50:00+00:00
 */
import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddExercises from "./AddExercises";
class ViewWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workout: [],//empty array to store workout in
      exercises: [],//empty array to store exercises in
    };
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_API_URL + "/workouts/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          workout: res.data, //response data stored in workout array
          exercises: res.data.exercises //response data.exercises stored in exercises array
        });
      })
      .catch(err => {
        console.log(err);//log err if error
      });
  }

  componentDidUpdate() {//if component updates performs same function as componentDidMount
    axios
      .get(process.env.REACT_APP_API_URL + "/workouts/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          workout: res.data,
          exercises: res.data.exercises
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  exerciseList() {
    if (this.state.exercises.length > 0) {
      return this.state.exercises.map(exercise => {
        return (
          <Card key={exercise._id}>
            <Card.Body>
              <Card.Title>{exercise.exercise.name}</Card.Title>
              <Card.Text>Sets: {exercise.sets}</Card.Text>
              <Card.Text>Reps: {exercise.reps}</Card.Text>
              <Card.Text>Weight: {exercise.weight}KG</Card.Text>
              <Link
                to={
                  "/workouts/" +
                  this.state.workout._id +
                  "/exercises/" +
                  exercise._id
                }
              >
                Edit
              </Link>
            </Card.Body>
          </Card>
        );
      });
    } else {
      return (
        <Card>
          <Card.Body>
            <Card.Title>This workout contains no exercises</Card.Title>
            <Card.Text>Only the workout creater can add exercises</Card.Text>
          </Card.Body>
        </Card>
      );
    }
  }

  addExercises() {
    //checks if current email stored in localstorage matches email of workout creator
    let e = localStorage.getItem("email");
    if (this.state.workout.user === e) {
      //returns add exercise component
      return <AddExercises workoutId={this.state.workout._id} />;
    }
  }

  render() {
    //accessing workout array from state
    let workout = this.state.workout;
    //outputs wokrout name and calls exerciseList and addExercises functions
    return (
      <>
        <h1>{workout.name}</h1>
        <div>{this.exerciseList()}</div>
        <div>{this.addExercises()}</div>
      </>
    );
  }
}

export default ViewWorkout;
