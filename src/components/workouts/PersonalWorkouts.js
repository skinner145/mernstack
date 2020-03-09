/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:23:50+00:00
 */
import React from "react";
import axios from "axios";
import { Button, Table, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class PersonalWorkouts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workouts: [],//empty array to store workouts in
      matchingEmail: "" //will store localStorage email here
    };
  }

  componentDidMount() {
    axios
      .get(process.env.API_URL + "workouts")
      .then(res => {
        this.setState({
          workouts: res.data //response data stored in workouts
        });
      })
      .catch(err => {
        console.log(err);//log error if error
      });
    this.setState({
      matchingEmail: localStorage.getItem("email")//sets matchingEmail to email stored in localStorage
    });
  }

  componentDidUpdate() {//performs the same function as componentDidMount if component updates
    axios
      .get("http://localhost:4000/workouts")
      .then(res => {
        this.setState({
          workouts: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteWorkout(e) {
    //id passes as value to function
    let id = e.target.value;
    //needed for authorization in backend to check if user is loggedIn
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .delete("http://localhost:4000/workouts/" + id)
      .then(res => {
        console.log("Workout deleted");//log workout deleted if successful
      })
      .catch(err => {
        console.log(err);//log error if error
      });
  }

  displayWorkouts() {
    let email = localStorage.getItem("email");//access email stored in localStorage
    //filter wokroutarray by email, results in workouts current user created
    let personalWorkouts = this.state.workouts.filter(function(workout) {
      return workout.user === email;
    });
    //if the user has created workouts
    if (personalWorkouts.length > 0) {
      //outputs table with workout name, user email, link to view and a button to delete
      return (
        <>
          <h1>Your workouts</h1>
          <Table bordered striped hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Created by</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {personalWorkouts.map(workout => {
                return (
                  <tr key={workout._id}>
                    <td>{workout.name}</td>
                    <td>{workout.user}</td>
                    <td>
                      <Link to={"/workouts/" + workout._id}>View</Link>
                    </td>
                    <td>
                      {/*workout_id set as buttons value and passed to deleteWorkout function when pressed*/}
                      <Button value={workout._id} onClick={this.deleteWorkout}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    } else { //if user has not created workouts
      return (
        <Card>
          <Card.Body>
            <Card.Title>
              You currently have no workouts. Create one{" "}
              <Link to={"/workouts/create"}>here</Link>
            </Card.Title>
          </Card.Body>
        </Card>
      );
    }
  }

  render() {
    //calls displayWorkouts function
    return <>{this.displayWorkouts()}</>;
  }
}

export default PersonalWorkouts;
