/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-03T14:41:47+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T15:08:14+00:00
 */
import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class EditExercise extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTargetMuscle = this.onChangeTargetMuscle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //declaring variables to be used later
    this.state = {
      title: "",
      muscle: "",
      description: "",
      muscles: []
    };
  }
  //setting variables to data retrieved from database
  componentDidMount() {
    axios
      .get("http://localhost:4000/exercises/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          muscle: res.data.muscle,
          description: res.data.description
        });
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
      //used for muscle dropdown
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
//when name changes set to name state
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
//when muscle chanegs set to muscle state
  onChangeTargetMuscle(e) {
    this.setState({
      muscle: e.target.value
    });
  }
  //when description changes set to description state
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
//when form submitted

  onSubmit(e) {
    e.preventDefault();
    //object made up of name muscel and state description
    const obj = {
      name: this.state.name,
      muscle: this.state.muscle,
      description: this.state.description
    };
    //needed for user authorization
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    //axios put with object passed to update exercise
    axios
      .put("http://localhost:4000/exercises/" + this.props.match.params.id, obj)
      .then(res => console.log(res.data));
      //sets /exercises as current path
    this.props.history.push("/exercises");
  }

  render() {
    const { muscles } = this.state;
    //form for updating exercises
    //default values are what was retrieved from the database
    //dropdown for muscle
    return (
      <Form>
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
          <Form.Control
            as="select"
            value={this.state.muscle}
            onChange={this.onChangeTargetMuscle}
          >
            <option>Select...</option>
            {muscles.map(function(muscle) {
              return (
                <option value={muscle._id} key={muscle._id}>
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

export default EditExercise;
