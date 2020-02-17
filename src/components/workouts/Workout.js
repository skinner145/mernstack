/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:51:01+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T13:40:48+00:00
 */
import React from "react";
import { Link } from "react-router-dom";

class Workout extends React.Component {
  //outputs a table row with the workout name, user and link to view it
  render() {
    //props passed through is workout
    let workout = this.props.workout;

    return (
      <tr key={workout._id}>
        <td>{workout.name}</td>
        <td>{workout.user}</td>
        <td>
          <Link to={"/workouts/" + this.props.workout._id}>View</Link>
        </td>
      </tr>
    );
  }
}

export default Workout;
