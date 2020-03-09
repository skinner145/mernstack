/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-05T17:50:29+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-09T14:24:39+00:00
 */
import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Workout from './Workout'

class WorkoutList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      workouts: [] //empty array to store workouts in
    }
  }

  componentDidMount(){
    axios.get(process.env.API_URL + '/workouts')//retireving all workouts
    .then(res => {
      this.setState({
        workouts: res.data //storing response data in workouts array
      })
    })
    .catch(err => {
      console.log(err)//log error if error
    })
  }

  componentDidUpdate(){//if component updates it performs the same action as componentDidMount
    axios.get(process.env.API_URL + '/workouts')
    .then(res => {
      this.setState({
        workouts: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  //for each workout out put a Workout component
  workoutList(){
        return this.state.workouts.map((currentWorkout, i) => {
          return (<Workout workout={currentWorkout} key={currentWorkout._id} />)
        })
  }


  render () {

    return(
      <>
        <h1>All workouts</h1>
          <Table striped bordered hover>
            <thead>
            <tr>
              <td>Name</td>
              <td>Created By</td>
              <td></td>
            </tr>
            </thead>
            <tbody>
              {this.workoutList()}
            </tbody>
      </Table>
      </>
    )
  }
}

export default WorkoutList;
