/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:25:38+00:00
 */
import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

class ViewExercise extends React.Component {
  constructor(props) {
    super(props);

    //declaring arrays to store data in
    this.state = {
      exercise: [],
      muscle: []
    };
  }

  componentDidMount() {
    axios
      .get(process.env.API_URL + "/exercises/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          exercise: res.data,//store exercise in exercise array
          muscle: res.data.muscle //store muscle in muscle array
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const exercise = this.state.exercise;
    const muscle = this.state.muscle;
    //outputs a card with exericse name, muscle, description and a link to edit
    return (
      <Card>
        <Card.Body>
          <Card.Title>{exercise.name}</Card.Title>
          <Card.Subtitle>{muscle.name}</Card.Subtitle>
          <Card.Text>{exercise.description}</Card.Text>
          <Link to={"/exercises/" + exercise._id + "/edit"}>Edit</Link>
        </Card.Body>
      </Card>
    );
  }
}

export default ViewExercise;
