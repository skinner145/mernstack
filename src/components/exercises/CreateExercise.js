/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T17:42:32+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:24:58+00:00
 */
import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTargetMuscle = this.onChangeTargetMuscle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //variables declared to be used later
    this.state = {
      name: "",
      muscle: "",
      description: "",
      muscles: [],
    };
  }
//when name changes set to name state
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  //when target muscle changes set to muscle
  onChangeTargetMuscle(e) {
    this.setState({
      muscle: e.target.value
    });
  }
//when description changes set to description
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  //when form submitted
  onSubmit(e) {
    e.preventDefault();
    //object made up of name, muscle and description state
    const newExercise = {
      name: this.state.name,
      muscle: this.state.muscle,
      description: this.state.description
    };
    //needed for user authorization
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    //axios post with object passed to createt new exercise
    axios
      .post(process.env.API_URL + "/exercises/create", newExercise)
      .then(res => console.log(res.data));
      //state reset
    this.setState({
      name: "",
      muscle: "",
      description: ""
    });
    this.props.history.push("/exercises");
  }
  //stores muscles in muscles array for dropdown menu
  componentDidMount() {
    axios
      .get("http://localhost:4000/muscles")
      .then(res => {
        this.setState({
          muscles: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const muscles = this.state.muscles
    //form to create an exercise
    //name, muscle and description

    return (
      <Form>
        <h1>Create an exercise</h1>
        <Form.Group>
          <Form.Label>Exercise name</Form.Label>
          <Form.Control
            type="text"
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Target Muscle</Form.Label>
          <Form.Control as="select" onChange={this.onChangeTargetMuscle}>
            <option>Select...</option>
            {muscles.map(function(muscle) {
              return (
                <option key={muscle._id} value={muscle._id}>
                  {muscle.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            value={this.state.description}
            onChange={this.onChangeDescription}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default withRouter(CreateExercise);
