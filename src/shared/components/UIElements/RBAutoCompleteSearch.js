import React, { useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Fuse from "fuse.js";
import { matchSorter } from "match-sorter";

// import "./AutoCompleteSearch.css";

function RBAutoCompleteSearch(props) {
  const [value, setValue] = useState(props.initialValue);
  const [rows, setRows] = useState([]);
  const ref = useRef();

  React.useEffect(() => {
    (function () {
      let activeElIndex = 0;
      const children = ref.current.children;
      ref.current.addEventListener("keydown", (event) => {
        // const activeElement = document.activeElement;
        if (event.key === "ArrowUp") {
          if (activeElIndex > 0) {
            activeElIndex--;
            if (activeElIndex > 0) {
              children[1].children[activeElIndex - 1].focus();
            } else children[0].focus();
          }
          // if (activeEl.nodeName.toLowerCase() === "input") {
          //   // console.log("hello me");
          //   // var val = activeEl.value; //store the value of the element
          //   // activeEl.value = ""; //clear the value of the element
          //   // activeEl.value = val; //set that value back.
          //   // let end = activeEl.value.length;
          //   // // ✅ Move focus to END of input field
          //   // activeEl.setSelectionRange(end, end);
          //   activeEl.select();
          // }

          // children[activeElIndex].select();

          // console.log("active", document.activeElement);
        }
        if (event.key === "ArrowDown") {
          activeElIndex++;
          // console.log("n of children[1]", children[1].children.length);
          // console.log("n of children[1]", children[1].children.length);

          if (activeElIndex < children[1].children.length + 1)
            children[1].children[activeElIndex - 1].focus();
          else activeElIndex--;

          // console.log(children[activeElIndex]);
        }
      });
    })();
  }, []);
  React.useEffect(() => {
    (function () {
      setValue(props.initialValue);
    })();
  }, [props.initialValue]);
  React.useEffect(() => {
    (function () {
      if (props.closeSuggestionBox === true) setRows([]);
    })();
  }, [props.closeSuggestionBox]);

  // const fuse = new Fuse(props.items, options);

  // console.log("mwwwwwwwwwww", props.items);
  const onChange = (event) => {
    props.setCloseSuggestionBox(false);
    let newValue = event.target.value;
    setValue(newValue);
    let searchSuggestions;
    if (newValue) {
      searchSuggestions = matchSorter(props.items, newValue, {
        keys: ["title"],
      });
    } else searchSuggestions = [];

    // fuse.search(newValue);
    // console.log(searchSuggestions);

    const newRows = searchSuggestions.map((item) => (
      <OverlayTrigger
        //   key={placement}
        placement="right"
        className="bg-primary border  "
        overlay={
          <Tooltip>
            {props.type
              ? props.cues.filter((cue) => cue.id === item.cueId)[0].text
              : item.definition}
          </Tooltip>
        }
      >
        <button
          className=" border rounded-0 auto-b"
          onClick={selectSuggetionHandler}
        >
          {item.title}
        </button>
      </OverlayTrigger>
    ));
    setRows(newRows);
  };
  const selectSuggetionHandler = (event) => {
    props.handleWordChange(event.target.textContent);
    setValue(event.target.textContent);
    setRows([]);
    // console.log("happened on click", event);
  };
  return (
    <React.Fragment>
      <div ref={ref} className="auto-wrapper">
        <input
          value={value}
          type="search"
          onChange={onChange}
          className="auto-input"
          placeholder={
            props.type ? "Search in subtitle" : "Search in data-base"
          }
        />
        <div className="list-group auto-ul-wrapper">{rows}</div>
      </div>
    </React.Fragment>
  );
}
export default RBAutoCompleteSearch;
