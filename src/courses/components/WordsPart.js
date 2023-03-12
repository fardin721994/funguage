import React, { useState } from "react";
import WordItem from "./WordItem";
import Button from "react-bootstrap/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";

function WordsPart(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [wordList, setWordList] = useState([
    { subtitleWord: "", databaseWord: "" },
  ]);
  const [closeSuggestionBox, setCloseSuggestionBox] = useState(false);

  const handleWordChange = (value, type, index) => {
    const list = [...wordList];
    type === "subtitle"
      ? (list[index].subtitleWord = value)
      : (list[index].databaseWord = value);
    setWordList(list);
  };

  const handleWordRemove = (index) => {
    let list = [...wordList];
    list.splice(index, 1);
    setWordList([...list]);
  };

  const handleWordAdd = () => {
    setWordList((preState) => {
      return [...preState, { subtitleWord: "", databaseWord: "" }];
    });
  };
  // const closeSuggestionBoxHandler = (e) => console.log(e);
  const closeSuggestionBoxHandler = (event) => {
    if (event.target.className !== "auto-input") setCloseSuggestionBox(true);
  };
  const wordsSaveHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/courses/words",
        "POST",
        JSON.stringify({
          name: "friends",
          content: wordList,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  };

  return (
    <div
      className="w-75 mx-auto my-5 bg-warning words-part-wrapper rounded-4"
      onClick={closeSuggestionBoxHandler}
    >
      <div className=" w-75 mx-auto py-4">
        {wordList.map((word, index) => (
          <div className="row bg-primary align-items-center  mb-2 rounded-2">
            <div className="col-10">
              <WordItem
                subtitleWord={word.subtitleWord}
                databaseWord={word.databaseWord}
                subtitleWords={props.subtitleWords}
                databaseWords={props.databaseWords}
                cues={props.cues}
                handleWordChange={(value, type) =>
                  handleWordChange(value, type, index)
                }
                closeSuggestionBox={closeSuggestionBox}
                setCloseSuggestionBox={setCloseSuggestionBox}
              />
            </div>
            <div className="col-2">
              <Button variant="danger" onClick={() => handleWordRemove(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="row w-50 mx-auto mb-2">
          <Button variant="success" onClick={handleWordAdd}>
            Add a word
          </Button>
        </div>
        <div className="row w-50 mx-auto mb-2">
          <Button variant="dark" onClick={wordsSaveHandler}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
export default WordsPart;
