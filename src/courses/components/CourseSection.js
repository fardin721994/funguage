import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../main/components/Registration/formik/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { ErrorMessage } from "formik";
import TextError from "../../main/components/Registration/formik/TextError";
import Progress from "./Progress";
import axios from "axios";

import WordItem from "./WordItem";
import WordsPart from "./WordsPart";
import SubtitleUploadPart from "./SubtitleUploadPart";
import VideoUploadPart from "./VideoUploadPart";

function CourseSection(props) {
  const [uploadedSubtitleSrc, setUploadedSubtitleSrc] = useState();
  const [databaseWords, setDatabaseWords] = useState([]);
  const [subtitleWords, setSubtitleWords] = useState([]);
  const [cues, setCues] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  React.useEffect(() => {
    (function () {
      const dataRetreive = async () => {
        try {
          const retrievedDatabaseWords = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/database"
          );
          //// to add id key. we have _id key but I need id key.
          retrievedDatabaseWords.forEach((data) => {
            data.id = data._id;
          });
          ////
          setDatabaseWords(retrievedDatabaseWords);
        } catch (err) {
          console.log("sth wrong happened");
        }
      };
      dataRetreive();
    })();
  }, []);
  React.useEffect(() => {
    (function () {
      if (uploadedSubtitleSrc) {
        const video = document.getElementById("vp-video");
        const track = document.getElementById("vp-track");
        const wordFilter = [
          "",
          ".",
          "?",
          "!",
          "a",
          "I",
          "an",
          "on",
          "that",
          "to",
          "is",
          "-",
        ];
        track.addEventListener(`load`, () => {
          // video.textTracks[0].cues.forEach((element) => console.log(element));
          // console.log(video.textTracks[0].cues);
          // const cues = Array.from(video.textTracks[0].cues, (cue) => {
          //   return { id: cue.id, text: cue.text };
          // });
          console.log("hello i'm starting");
          let wordId = 0;
          let allWords = [];
          let allCues = [];
          for (let i = 0; i < video.textTracks[0].cues.length; i++) {
            let cue = video.textTracks[0].cues[i];
            // console.log(allCues);
            let text = cue.text;
            text = text
              .replaceAll(".", " .")
              .replaceAll("?", " ?")
              .replaceAll("\n", " ");

            allCues.push({ id: cue.id, text: text });
            let cueWords = text.split(" ");
            cueWords = cueWords.map((word) => word.trim());
            cueWords = cueWords.filter((word) => !wordFilter.includes(word));

            cueWords = cueWords.map((word) => {
              wordId++;
              return {
                title: word,
                cueId: cue.id,
                id: wordId,
              };
            });

            allWords = [...allWords, ...cueWords];
          }
          setSubtitleWords(allWords);
          setCues(allCues);
          // console.log("rrrrrrrrrrrrrrrr", words);

          // for (const cue in video.textTracks[0].cues) {
          //   console.log(cue);
          // }
        });
      }
    })();
  }, [uploadedSubtitleSrc]);
  // console.log("me subbbbbbbb", uploadedSubtitleSrc);
  //   console.log("database", database);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <SubtitleUploadPart
          className=" w-50 mx-auto"
          setUploadedSubtitleSrc={setUploadedSubtitleSrc}
        />
        <VideoUploadPart className="w-50 mx-auto" />
        <video id="vp-video" controls preload="metadata" className="d-none">
          {/* <source src={videosource} /> */}
          {uploadedSubtitleSrc ? (
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              // src="media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"
              src={uploadedSubtitleSrc}
              default
              id="vp-track"
            />
          ) : null}
        </video>
        <WordsPart
          subtitleWords={subtitleWords}
          databaseWords={databaseWords}
          cues={cues}
        />
      </div>
    </React.Fragment>
  );
}
export default CourseSection;
