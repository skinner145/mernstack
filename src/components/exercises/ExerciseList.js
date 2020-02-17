/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-04T17:42:21+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-02-17T14:26:45+00:00
 */
import React from "react";
import axios from "axios";
import { ListGroup, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

class ExerciseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],//will store exercises here
      currentPage: 1,//starting page of pagination
      itemsPerPage: 10//items per page in pagination
    };
    this.handleClick = this.handleClick.bind(this);
  }
  //retireves exercieses and stores them in exercise array
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

//if component updates repeat steps in componentDidMount
  componentDidUpdate() {
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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id) //setting current page to number selected by user
    });
  }

  render() {
    const { exercises, currentPage, itemsPerPage } = this.state;
    //index of last item on page is equal to current page * items per page, starts off at 10
    const indexOfLastItem = currentPage * itemsPerPage;

    //index of first item is index of last item - items perpage, starts at 0
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //slices exercises array to retireve correct exercises for each page
    //starts of with sllice from 0-10
    const currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);

    //loops through currentitems array and outputs list item with link to ViewExercise component
    const renderItems = currentItems.map(exercise => {
      return (
        <ListGroup.Item key={exercise._id}>
          <Link to={"/exercises/" + exercise._id}>{exercise.name}</Link>
        </ListGroup.Item>
      );
    });

    //array to stored page numbers in
    const pageNumbers = [];
    //loop for exercises length / items per page
    //pushes i to array
    for (let i = 1; i <= Math.ceil(exercises.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    //loopsthrough pageNumbers array and outputs pagination item with number
    //when number selected it becomes active and handleClick functionis called
    let active;
    const renderedPageNumbers = pageNumbers.map(number => {
      return (
        <Pagination.Item
          key={number}
          id={number}
          onClick={this.handleClick}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    });
//list rendered and pagination numbers rendered below it
    return (
      <div>
        <h1>All exercises</h1>
        <div>
          <ListGroup>{renderItems}</ListGroup>
        </div>
        <div>
          <Pagination>{renderedPageNumbers}</Pagination>
        </div>
      </div>
    );
  }
}

export default ExerciseList;
