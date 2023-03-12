import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function ImageInput() {
  const FILE_SIZE = 300000;
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const initialValues = { file: null };

  const onSubmit = (values) => {
    // console.log(values);
    // console.log(values.file);
    alert(
      JSON.stringify(
        {
          fileName: values.file.name,
          type: values.file.type,
          size: `${values.file.size} bytes`,
        },
        null,
        2
      )
    );
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .test(
        "FILE_SIZE",
        "File Size is too large",
        (value) => value.size <= FILE_SIZE
      )
      .test("SUPPORTED_FORMATS", "Unsupported File Format", (value) =>
        SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <input
              name="file"
              type="file"
              onChange={(event) => {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
            {formik.errors.file ? (
              <div className="error">{formik.errors.file}</div>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
}

export default ImageInput;
