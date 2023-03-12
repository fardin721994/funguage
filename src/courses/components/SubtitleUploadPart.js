import React from "react";
import Form from "react-bootstrap/Form";
import FileUpload from "./FileUpload";
function SubtitleUploadPart(props) {
  return (
    <div className="mb-3 w-75  mx-auto bg-warning rounded-4 py-2">
      {/* <Form.Group
        controlId="formFile"
        className="w-50 mx-auto my-2 bg-primary px-5 py-3 rounded-2"
      >
        <Form.Label className="bg-light p-1 rounded-1">
          Upload your subtitle in .vtt format{" "}
        </Form.Label>
        <Form.Control type="file" />
      </Form.Group> */}
      <FileUpload
        fileType="subtitle"
        setUploadedFileSrc={props.setUploadedSubtitleSrc}
      />
    </div>
  );
}
export default SubtitleUploadPart;
