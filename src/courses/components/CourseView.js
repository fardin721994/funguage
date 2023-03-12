import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VideoPlayer from "./VideoPlayer";
function CourseView() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [courseData, setCourseData] = useState();
  const [courseImages, setCourseImages] = useState();
  const [subtitle, setSubtitle] = useState();

  const courseId = "640762cd015f528a16a78b64";
  let data = {};
  let images = [];
  React.useEffect(() => {
    (function () {
      const subtitleRetreive = async () => {
        try {
          const retrievedSubtitle = await fetch(
            process.env.REACT_APP_BACKEND_URL + `/subtitle/friends/1`
          );
          let blob = await retrievedSubtitle.blob();
          let url = await window.URL.createObjectURL(blob);

          setSubtitle(url);
          // let reader = new FileReader();

          // reader.readAsDataURL(retrievedSubtitle);

          // reader.onloadend = function () {
          //   // imgavat.attr('src', reader.result);
          //   setSubtitle(reader.result);

          //   // props.setUploadedFileSrc(reader.result);
          // };
        } catch (err) {
          console.log("sth wrong happened with loading subtitle", err);
        }
      };
      subtitleRetreive();
    })();
  }, []);
  React.useEffect(() => {
    (function () {
      const courseDataRetreive = async () => {
        try {
          const retrievedCourseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + `/courses/data/${courseId}`
          );
          // for (const wordPair of retrievedCourseData) {
          //   let image = await sendRequest(
          //     process.env.REACT_APP_BACKEND_URL +
          //       `/images/${wordPair.databaseWord}`
          //   );
          //   console.log(image);
          // }

          setCourseData(retrievedCourseData);
        } catch (err) {
          console.log("sth wrong happened");
        }
      };
      courseDataRetreive();
    })();
  }, []);
  // React.useEffect(() => {
  //   (function () {})();
  // }, [data]);
  // console.log("im sub", subtitle);
  if (courseData && subtitle) {
    courseData.course.content.forEach((element) => {
      data[`${element.subtitleWord}`] = element.databaseWord + ".png";
    });
    return <VideoPlayer data={data} subtitle={subtitle} />;
  }
  return <div></div>;
}
export default CourseView;
