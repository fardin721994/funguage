import React from "react";
// import Navigation from "../../main/components/heading/navigation/Navigation";
import WordInput from "../components/WordInput";
import VideoInput from "../components/ImageInput";
import WordImageInput from "../components/WordImageInput";
function NewCourse(props) {
  return (
    <React.Fragment>
      {/* <Navigation /> */}
      {/* <WordInput userId={props.userId} /> */}
      {/* <VideoInput userId={props.userId} /> */}
      <WordImageInput userId={props.userId} />
    </React.Fragment>
  );
}

export default NewCourse;
