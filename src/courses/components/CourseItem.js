import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import imageSource from "./media/logo192.png";

function CourseItem({ title, imgSrc, text }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={""} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        {/* <Link to={`/course/${props.userId}`}>View this course</Link> */}
        <Link to={`/course/friends`}>View this course</Link>
      </Card.Body>
    </Card>
  );
}

export default CourseItem;
