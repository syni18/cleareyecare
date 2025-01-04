import React, { useState, useRef } from "react";
import "./panupload.css";
import { useFormik } from "formik";

function PANUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      panNumber: "",
      declaration: false,
      panImage: null,
    },
    onSubmit: async (values) => {
      try {
        console.log("Form values:", values);
        // Send data to the server here
        // const response = await addPanCard(values);
        // console.log(response.data);
      } catch (error) {
        console.error("Error adding PAN Card:", error);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onload = () => {
        formik.setFieldValue("panImage", reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid JPEG file.");
    }
  };

  const removePreview = () => {
    setImagePreview(null);
    formik.setFieldValue("panImage", null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input value
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear value to ensure onChange fires
      fileInputRef.current.click(); // Trigger click on the input ref
    } else {
      console.error("File input element not found");
    }
  };

  return (
    <div className="pan-upload-wrapper">
      <div className="pan-upload-container">
        <div className="pan-upload-head">
          <label>PAN Card Information</label>
        </div>
        <form onSubmit={formik.handleSubmit} className="pan-upload-form">
          <div className="panupload-name">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name (same as PAN)"
              {...formik.getFieldProps("fullname")}
            />
          </div>
          <div className="panupload-no">
            <label>PAN Number</label>
            <input
              type="text"
              name="panNumber"
              placeholder="PAN Card Number"
              {...formik.getFieldProps("panNumber")}
            />
          </div>
          <div
            className="panupload-img"
            onClick={() => fileInputRef.current?.click()}
          >
            {!imagePreview ? (
              <>
                <label htmlFor="_pan-img">
                  Upload PAN <span>(Only JPEG allowed)</span>
                </label>
                <input
                  type="file"
                  name="panImage"
                  id="_pan-img"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <img src={imagePreview} alt="PAN Preview" />
            )}
          </div>
          {imagePreview && (
            <div className="imgview-wrap">
              <button
                type="button"
                className="imgview-remove"
                onClick={removePreview}
              >
                Remove
              </button>
              <button
                type="button"
                className="imgview-change"
                onClick={triggerFileInput}
              >
                Change
              </button>
            </div>
          )}
          <div className="pan-upload-declare">
            <input
              type="checkbox"
              name="declaration"
              id="_declaration"
              checked={formik.values.declaration}
              onChange={formik.handleChange}
            />
            <p className="pan-declare-text">
              I do hereby declare that PAN furnished/stated above is correct and
              belongs to me, registered as an account holder with
              www.cleareyelens.com. I further declare that I shall solely be
              held responsible for the consequences, in case of any false PAN
              declaration.
            </p>
          </div>
          <button
            type="submit"
            className="pan-uploadbtn"
            disabled={!formik.values.declaration}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default PANUpload;
