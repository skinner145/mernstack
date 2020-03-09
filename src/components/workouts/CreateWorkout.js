/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:42+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:22:54+00:00
 */
import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class CreateWorkout extends React.Component {
  constructor(props) {
    super(props);
    //binds values to functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",//workout name set to this state
    };
  }
//when name changes set value to name state
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
//when form submitted
  onSubmit(e) {
    e.preventDefault();
    //object created to pass in axios post
    //wokrout name and current user email are in the object
    const newWorkout = {
      name: this.state.name,
      user: localStorage.getItem("email")
    };
    //needed for user authorization
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    //axios post to create workout
    axios
      .post(process.env.REACT_APP_API_URL + "/workouts/create", newWorkout)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/workouts/myworkouts");
      })
      .catch(err => {
        console.log(err);
      });
      //sets name back to empty string
    this.setState({
      name: ""
    });
  }

  render() {
    //form for creating workout
    return (
      <Form>
        <h1>Create a workout</h1>
        <Form.Group>
          <Form.Label>Workout Name</Form.Label>
          <Form.Control
            type="text"
            value={this.state.name}
            onChange={this.onChangeName}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default withRouter(CreateWorkout);
