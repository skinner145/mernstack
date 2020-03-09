/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-13T15:12:17+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:23:16+00:00
 */
import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class EditWorkoutExercise extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      exercise: "",
      sets: "",
      reps: "",
      exercises: []
    };
  }

  componentDidMount() {
    axios
      .get(
        prcoess.env.REACT_APP_API_URL + "/workouts/" +
          this.props.workoutId +
          "/exercises/" +
          this.props.exerciseId
      )
      .then(res => {
        this.setState({
          exercise: res.data.exercise,
          sets: res.data.sets,
          reps: res.data.reps
        });
      })
      .catch(err => {
        console.log(err);
      });

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

  onChangeExercise(e) {
    this.setState({
      exercise: e.target.value
    });
  }

  onChangeSets(e) {
    this.setState({
      sets: e.target.value
    });
  }

  onChangeReps(e) {
    this.setState({
      reps: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      exercise: this.state.exercise,
      sets: this.state.sets,
      reps: this.state.reps
    };
    axios
      .put(
        "http://localhost4000/workouts/" +
          this.props.workoutId +
          "/exercises/" +
          this.props.exerciseId,
        obj
      )
      .then(res => console.log(res.data));
  }
  render() {
    const { exercises } = this.state;

    return (
      <Form>
        <Form.Group>
          <Form.Label>Exercise</Form.Label>
          <Form.Control as="select" onChange={this.onChangeExercise}>
            {exercises.map(function(exercise) {
              return (
                <option value={exercise._id} key={exercise._id}>
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
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default EditWorkoutExercise;
