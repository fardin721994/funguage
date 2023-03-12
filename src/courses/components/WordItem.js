import React, { useState } from "react";
import RBAutoCompleteSearch from "../../shared/components/UIElements/RBAutoCompleteSearch";
import "./WordItem.css";

function WordItem(props) {
  return (
    <div className="container-fluid ">
      <div className="row  p-1  bg-primary rounded-3">
        <div className="col-3 p-2 ">
          <RBAutoCompleteSearch
            items={props.subtitleWords}
            cues={props.cues}
            type={"subtitle"}
            initialValue={props.subtitleWord}
            handleWordChange={(value) =>
              props.handleWordChange(value, "subtitle")
            }
            closeSuggestionBox={props.closeSuggestionBox}
            setCloseSuggestionBox={props.setCloseSuggestionBox}
          />
        </div>
        <div className="col-3"></div>
        <div className="col-3 p-2 ">
          <RBAutoCompleteSearch
            items={props.databaseWords}
            initialValue={props.databaseWord}
            handleWordChange={(value) =>
              props.handleWordChange(value, "database")
            }
            closeSuggestionBox={props.closeSuggestionBox}
            setCloseSuggestionBox={props.setCloseSuggestionBox}
          />
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
export default WordItem;
