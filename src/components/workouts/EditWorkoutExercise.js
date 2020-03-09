/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-13T15:12:17+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:23:39+00:00
 */
import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class EditWorkoutExercise extends React.Component {
  constructor(props) {
    super(props);

    //binds values to functions
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeSets = this.onChangeSets.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      exercise: "",//set to exercise value
      sets: "",//set to sets value
      reps: "",//set to reps value
      weight: '',//set to weight value
      exercises: []//empty array to store exercises in
    };
  }

  componentDidMount() {
    //needed for user authentication
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    //sets values to matching value from database
    axios
      .get(
        process.env.API_URL + "/" +
          this.props.match.params.wid +
          "/exercises/" +
          this.props.match.params.eid
      )
      .then(res => {
        this.setState({
          exercise: res.data.exercise,
          sets: res.data.sets,
          reps: res.data.reps,
          weight: res.data.weight
        });
      })
      .catch(err => {
        console.log(err);
      });
      //stores exercises in exercises array
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
//when exercise value changes set it to exercise state
  onChangeExercise(e) {
    this.setState({
      exercise: e.target.value
    });
  }
//when sets value changes set it to sets state
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
  onChangeWeight(e){
    this.setState({
      weight: e.target.value
    })
  }
//when form submitted
  onSubmit(e) {
    e.preventDefault();
    //stores state values in object
    const obj = {
      exercise: this.state.exercise,
      sets: this.state.sets,
      reps: this.state.reps,
      weight: this.state.weight
    };
    //passes obj in axios put method to update exercise
    axios
      .put(
        "http://localhost:4000/workouts/" +
          this.props.match.params.wid +
          "/exercises/" +
          this.props.match.params.eid,
        obj
      )
      .then(res => console.log(res.data));
    this.props.history.push("/workouts/" + this.props.match.params.wid);
  }
  render() {
    const { exercises } = this.state;
    //form for exercise
    //exercises array output as select
    //default values are set as what was retireved from database
    return (
      <Form>
        <Form.Group>
          <Form.Label>Exercise</Form.Label>
          <Form.Control as="select" value={this.state.exercise}onChange={this.onChangeExercise}>
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
        <Form.Group>
          <Form.Label>Weight(KG)</Form.Label>
          <Form.Control
            type="number"
            value={this.state.weight}
            onChange={this.onChangeWeight}
          />
        </Form.Group>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default EditWorkoutExercise;
