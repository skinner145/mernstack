/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-12T11:44:33+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:10:57+00:00
 */
import React from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

class AddExercises extends React.Component {
  constructor(props) {
    super(props);
    //binds values to functions
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //declaring variables to use later
    this.state = {
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
      exercises: []
    };
  }
//when exercise value changes set it to exercises state
  onChangeExercise(e) {
    this.setState({
      exercise: e.target.value
    });
  }
//when sets valye changes set it to sets state
  onChangeSets(e) {
    this.setState({
      sets: e.target.value
    });
  }
//when reps value changes set it to reps state
  onChangeReps(e) {
    this.setState({
      reps: e.target.value
    });
  }
//when weight value changes set it to weight state
  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }
////when form submitted
  onSubmit(e) {
    e.preventDefault();
//object created to pass in axios post
//object made up of exercise, sets, reps and weight state values
    const newExercise = {
      exercise: this.state.exercise,
      sets: this.state.sets,
      reps: this.state.reps,
      weight: this.state.weight
    };
    //needed for user othorization
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    //axios post with object passed to add exercise to workout
    axios
      .post(
        "http://localhost:4000/workouts/" +
          this.props.workoutId +
          "/exercises/create",
        newExercise
      )
      .then(res => console.log(res.data));

      //state values reset
    this.setState({
      exercise: "",
      sets: "",
      reps: "",
      weight: ""
    });
  }
//retrieves exercises to output as select
  componentDidMount() {
    axios
      .get("http://localhost:4000/exercises")
      .then(res => {
        this.setState({
          exercises: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { exercises } = this.state;
    //form for adding exercise to workout
    //fields for exercise, sets, reps and Weight
    //exercise is dropdown of exercises array
    return (
      <Card>
        <Card.Body>
          <Card.Title>Add an exercise</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Exercise</Form.Label>
              <Form.Control
                as="select"
                value={this.state.exercise}
                onChange={this.onChangeExercise}
              >
                <option>Select...</option>
                {exercises.map(function(exercise) {
                  return (
                    <option key={exercise._id} value={exercise._id}>
                      {exercise.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sets</Form.Label>
              <Form.Control
                type="number"
                value={this.state.sets}
                onChange={this.onChangeSets}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Reps</Form.Label>
              <Form.Control
                type="number"
                value={this.state.reps}
                onChange={this.onChangeReps}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Weight(KG)</Form.Label>
              <Form.Control
                type="number"
                value={this.state.weight}
                onChange={this.onChangeWeight}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default AddExercises;
