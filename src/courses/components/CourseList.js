import React, { useState } from "react";
import CourseItem from "./CourseItem";
import Button from "react-bootstrap/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

const CourseList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [courseList, setCourseList] = useState([
    { title: "friends", text: "Let's be friends", imgSrc: "./logo192.png" },
  ]);

  // React.useEffect(() => {
  //   (function () {
  //     const courseListRetreive = async () => {
  //       try {
  //         const retrievedCourseList = await sendRequest(
  //           process.env.REACT_APP_BACKEND_URL + "/courses/all"
  //         );
  //         setCourseList(retrievedCourseList);
  //       } catch (err) {
  //         console.log("sth wrong happened");
  //       }
  //     };
  //     courseListRetreive();
  //   })();
  // }, []);

  if (courseList.length === 0) {
    return (
      <div className="place-list center">
        <h2>No courses found. Maybe create one?</h2>
        <Button to="/courses/new">Share Course</Button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {courseList.map((course) => (
        <CourseItem
          title={course.title}
          text={course.text}
          imgSrc={course.imgSrc}
        />
      ))}
    </div>
  );
};

export default CourseList;
