import React, { useState, useRef } from "react";
import "./VideoPlayer.css";
import Modal from "../../shared/components/UIElements/Modal";

// import MyModal from "../../../main/bootstrap/MyModal";
// import videoPath from "../../../main/components/tour/media/Friends.S01E01.720p_IFR.mp4";
// import subPath from "../../../main/components/tour/media/friends.s01e01_720p_bluray_x264-sujaidr.vtt";

const VideoPlayer = ({ data, videoSrc, subtitle }) => {
  const [rows, setRows] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  // const image = React.createRef();

  // const sub = useRef();
  // console.log(sub);

  const video = useRef();

  const wordClickHandler = (event) => {
    video.current.pause();
    setShowModal(true);
  };

  const closeModalHandler = () => {
    video.current.play();
    setShowModal(false);
  };
  // For modal

  const [showModal, setShowModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);

  ///////////

  // console.log(data);

  React.useEffect(() => {
    (function () {
      // "use strict";

      // Does the browser actually support the video element?
      var supportsVideo = !!document.createElement("video").canPlayType;

      if (supportsVideo) {
        // Obtain handles to main elements
        var videoContainer = document.getElementById("vp-videoContainer");
        var video = document.getElementById("vp-video");
        var image = document.getElementById("vp-image");

        var track = document.getElementById("vp-track");
        var videoControls = document.getElementById("vp-video-controls");
        // console.log(video.textTracks[0].cues[1]);
        // console.log(["a", "b", "c"]);
        track.addEventListener(`load`, () => {
          console.log(video.textTracks[0].cues[1]);
        });

        track.addEventListener("cuechange", (event) => {
          // console.log(event);
          if (event.target.track?.activeCues[0]?.text) {
            let text = event.target.track?.activeCues[0]?.text;
            // Text with /n seperated from the words
            text = text.replaceAll(".", " .").replaceAll("?", " ?");
            const lines = text.split("\n"); // Output example :  ["How are you?","I'm fine.","Thank you."]
            let words = lines.map((line) => line.split(" ")); // Output example :  [["How", " are"," you? "],["I'm", "fine.","Thank", "you."]]
            words = words.map((line) => line.map((word) => word.trim()));
            // Now let's remove the possible whitespace from both ends of a word:
            // Output example :  [["How", "are","you?"],["I'm", "fine.","Thank", "you."]]
            let counter = 0;
            const colors = ["text-primary", "text-success", "text-danger"];
            const newRows = words.map((line) => (
              <div className="d-flex justify-content-center">
                {line.map((word) => {
                  if (data[`${word}`]) {
                    // console.log("blueeeeeeeeeeeeeeeeeeee");
                    counter++;
                    setImageSrc(
                      process.env.REACT_APP_BACKEND_URL +
                        `/images/${data[`${word}`]}`
                    );
                    return (
                      <button
                        className={`subRow mx-2 ${colors[counter - 1]}`}
                        onClick={wordClickHandler}
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                      >
                        {word}
                      </button>
                    );
                  } else
                    return <button className=" subRow mx-2">{word}</button>;
                })}
              </div>
            ));
            setRows(newRows);
            // From MDN about fullscreen mode:
            // function toggleFullscreen() {
            //   let elem = document.querySelector("video");

            //   if (!document.fullscreenElement) {
            //     elem.requestFullscreen().catch((err) => {
            //       alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            //     });
            //   } else {
            //     document.exitFullscreen();
            //   }
            // }
          } else setRows([]);
        });

        // Hide the default controls
        video.controls = false;

        // Display the user defined video controls
        videoControls.setAttribute("data-state", "visible");

        // Obtain handles to buttons and other elements
        var playpause = document.getElementById("vp-playpause");
        var stop = document.getElementById("vp-stop");
        var mute = document.getElementById("vp-mute");
        var volinc = document.getElementById("vp-volinc");
        var voldec = document.getElementById("vp-voldec");
        var progress = document.getElementById("vp-progress");
        var progressBar = document.getElementById("vp-progress-bar");
        var fullscreen = document.getElementById("vp-fs");
        // var subtitles = document.getElementById("vp-subtitles");

        // If the browser doesn't support the progress element, set its state for some different styling
        var supportsProgress =
          document.createElement("progress").max !== undefined;
        if (!supportsProgress) progress.setAttribute("data-state", "fake");

        // Check if the browser supports the Fullscreen API
        var fullScreenEnabled = !!(
          document.fullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.msFullscreenEnabled ||
          document.webkitSupportsFullscreen ||
          document.webkitFullscreenEnabled ||
          document.createElement("video").webkitRequestFullScreen
        );
        // If the browser doesn't support the Fulscreen API then hide the fullscreen button
        if (!fullScreenEnabled) {
          fullscreen.style.display = "none";
        }

        // Check the volume
        var checkVolume = function (dir) {
          if (dir) {
            var currentVolume = Math.floor(video.volume * 10) / 10;
            if (dir === "+") {
              if (currentVolume < 1) video.volume += 0.1;
            } else if (dir === "-") {
              if (currentVolume > 0) video.volume -= 0.1;
            }
            // If the volume has been turned off, also set it as muted
            // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
            if (currentVolume <= 0) video.muted = true;
            else video.muted = false;
          }
          changeButtonState("mute");
        };

        // Change the volume
        var alterVolume = function (dir) {
          checkVolume(dir);
        };

        // Set the video container's fullscreen state
        var setFullscreenData = function (state) {
          videoContainer.setAttribute("data-fullscreen", !!state);
          // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
          fullscreen.setAttribute(
            "data-state",
            !!state ? "cancel-fullscreen" : "go-fullscreen"
          );
        };

        // Checks if the document is currently in fullscreen mode
        var isFullScreen = function () {
          return !!(
            document.fullScreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            document.msFullscreenElement ||
            document.fullscreenElement
          );
        };

        // Fullscreen
        var handleFullscreen = function () {
          // If fullscreen mode is active...
          if (isFullScreen()) {
            // ...exit fullscreen mode
            // (Note: this can only be called on document)
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen)
              document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen)
              document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            setFullscreenData(false);
          } else {
            // ...otherwise enter fullscreen mode
            // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)

            if (videoContainer.requestFullscreen) {
              videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
              videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullScreen) {
              // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
              // ensures that our custom controls are visible:
              // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
              // figure[data-fullscreen=true] .controls { z-index:2147483647; }
              video.webkitRequestFullScreen();
            } else if (videoContainer.msRequestFullscreen)
              videoContainer.msRequestFullscreen();
            setFullscreenData(true);
          }
        };

        // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
        if (document.addEventListener) {
          // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video

          video.addEventListener("loadedmetadata", function () {
            progress.setAttribute("max", video.duration);
          });
          // track.addEventListener("onChange", (e) => console.log("event", e));
          // track.addEventListener("cuechange", (event) => {
          //   let cues = event.target.track.activeCues;
          //   console.log(event.target.track?.activeCues[0]?.text);
          // });
          // Changes the button state of certain button's so the correct visuals can be displayed with CSS
          var changeButtonState = function (type) {
            // Play/Pause button
            if (type == "playpause") {
              if (video.paused || video.ended) {
                playpause.setAttribute("data-state", "play");
              } else {
                playpause.setAttribute("data-state", "pause");
              }
            }
            // Mute button
            else if (type == "mute") {
              mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
            }
          };

          // Add event listeners for video specific events
          video.addEventListener(
            "play",
            function () {
              changeButtonState("playpause");
            },
            false
          );
          video.addEventListener(
            "pause",
            function () {
              changeButtonState("playpause");
            },
            false
          );
          video.addEventListener(
            "volumechange",
            function () {
              checkVolume();
            },
            false
          );

          // Add events for all buttons
          playpause.addEventListener("click", function (e) {
            // console.log("hello ");

            if (video.paused || video.ended) video.play();
            else video.pause();
          });

          // Turn off all subtitles
          for (var i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = "hidden";
          }

          // Creates and returns a menu item for the subtitles language menu
          // var subtitleMenuButtons = [];
          // var createMenuItem = function (id, lang, label) {
          //   var listItem = document.createElement("li");
          //   var button = listItem.appendChild(document.createElement("button"));
          //   button.setAttribute("id", id);
          //   button.className = "vp-subtitles-button";
          //   if (lang.length > 0) button.setAttribute("lang", lang);
          //   button.value = label;
          //   button.setAttribute("data-state", "inactive");
          //   button.appendChild(document.createTextNode(label));
          //   button.addEventListener("click", function (e) {
          //     // Set all buttons to inactive
          //     subtitleMenuButtons.map(function (v, i, a) {
          //       subtitleMenuButtons[i].setAttribute("data-state", "inactive");
          //     });
          //     // Find the language to activate
          //     var lang = this.getAttribute("lang");
          //     for (var i = 0; i < video.textTracks.length; i++) {
          //       // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
          //       if (video.textTracks[i].language == lang) {
          //         video.textTracks[i].mode = "showing";
          //         this.setAttribute("data-state", "active");
          //       } else {
          //         video.textTracks[i].mode = "hidden";
          //       }
          //     }
          //     subtitlesMenu.style.display = "none";
          //   });
          //   subtitleMenuButtons.push(button);
          //   return listItem;
          // };
          // // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"
          // var subtitlesMenu;
          // if (video.textTracks) {
          //   var df = document.createDocumentFragment();
          //   var subtitlesMenu = df.appendChild(document.createElement("ul"));
          //   subtitlesMenu.className = "vp-subtitles-menu";
          //   subtitlesMenu.appendChild(
          //     createMenuItem("subtitles-off", "", "Off")
          //   );
          //   for (var i = 0; i < video.textTracks.length; i++) {
          //     subtitlesMenu.appendChild(
          //       createMenuItem(
          //         "subtitles-" + video.textTracks[i].language,
          //         video.textTracks[i].language,
          //         video.textTracks[i].label
          //       )
          //     );
          //   }
          //   videoContainer.appendChild(subtitlesMenu);
          // }
          // subtitles.addEventListener("click", function (e) {
          //   if (subtitlesMenu) {
          //     subtitlesMenu.style.display =
          //       subtitlesMenu.style.display == "block" ? "none" : "block";
          //   }
          // });

          // The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
          stop.addEventListener("click", function (e) {
            video.pause();
            video.currentTime = 0;
            progress.value = 0;
            // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
            changeButtonState("playpause");
          });
          mute.addEventListener("click", function (e) {
            video.muted = !video.muted;
            changeButtonState("mute");
          });
          volinc.addEventListener("click", function (e) {
            alterVolume("+");
          });
          voldec.addEventListener("click", function (e) {
            alterVolume("-");
          });
          fullscreen.addEventListener("click", function (e) {
            handleFullscreen();
          });

          // As the video is playing, update the progress bar
          video.addEventListener("timeupdate", function () {
            // For mobile browsers, ensure that the progress element's max attribute is set
            if (!progress.getAttribute("max"))
              progress.setAttribute("max", video.duration);
            progress.value = video.currentTime;
            progressBar.style.width =
              Math.floor((video.currentTime / video.duration) * 100) + "%";
          });

          // React to the user clicking within the progress bar
          progress.addEventListener("click", function (e) {
            // Also need to take the parents into account here as .controls and figure now have position:relative
            var pos =
              (e.pageX -
                (this.offsetLeft +
                  this.offsetParent.offsetLeft +
                  this.offsetParent.offsetParent.offsetLeft)) /
              this.offsetWidth;
            video.currentTime = pos * video.duration;
          });

          // Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
          document.addEventListener("fullscreenchange", function (e) {
            setFullscreenData(
              !!(document.fullScreen || document.fullscreenElement)
            );
          });
          document.addEventListener("webkitfullscreenchange", function () {
            setFullscreenData(!!document.webkitIsFullScreen);
          });
          document.addEventListener("mozfullscreenchange", function () {
            setFullscreenData(!!document.mozFullScreen);
          });
          document.addEventListener("msfullscreenchange", function () {
            setFullscreenData(!!document.msFullscreenElement);
          });
        }
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <figure
        id="vp-videoContainer"
        className="container-fluid p-0 m-0 position-relative "
        data-fullscreen="false"
      >
        <div className="row position-relative ">
          <video
            id="vp-video"
            className=" p-0 m-0"
            controls
            ref={video}
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source
              // All these four work fine.

              src={process.env.REACT_APP_BACKEND_URL + `/video/friends/1`}
              // src="./media/Friends.S01E01.720p_IFR.mp4"
              // src={"./media/Friends.S01E01.720p_IFR.mp4"}
              // src={"media/Friends.S01E01.720p_IFR.mp4"}
              // This does not work.

              // src={videoSrc}
            />
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              // src={subtitle}
              // All these four work fine.
              // src={
              //   process.env.REACT_APP_BACKEND_URL +
              //   `/courses-data/friends/section1/friends1.vtt`
              // }
              // src="./media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"
              // src={"./media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"}
              // This does not work.
              src={subtitle}
              default
              id="vp-track"
              // ref={sub}
            />
          </video>
          <div className=" subtitles w-100 position-absolute">{rows}</div>
        </div>
        <div
          id="vp-video-controls"
          className="vp-controls row bg-primary"
          data-state="hidden"
        >
          <button id="vp-playpause" type="button" data-state="play">
            Play/Pause
          </button>
          <button id="vp-stop" type="button" data-state="stop">
            Stop
          </button>
          <div className="vp-progress">
            <progress id="vp-progress" value="0" min="0">
              <span id="vp-progress-bar"></span>
            </progress>
          </div>
          <button id="vp-mute" type="button" data-state="mute">
            Mute/Unmute
          </button>
          <button id="vp-volinc" type="button" data-state="volup">
            Vol+
          </button>
          <button id="vp-voldec" type="button" data-state="voldown">
            Vol-
          </button>
          <button id="vp-fs" type="button" data-state="go-fullscreen">
            Fullscreen
          </button>
          {/* <button id="vp-subtitles" type="button" data-state="subtitles">
          CC
        </button> */}
        </div>
        <Modal
          show={showModal}
          onCancel={closeModalHandler}
          // header={"helloooooooooooo"}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<button onClick={closeModalHandler}>CLOSE</button>}
        >
          <img id="vp-image" className="image" src={imageSrc} />
        </Modal>
      </figure>

      {/* Here is the modal */}
      {/* Mooooooooodelllllllllllllllll */}
    </React.Fragment>
  );
};

export default VideoPlayer;
