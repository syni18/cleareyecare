import React, { useState, useRef } from "react";
import "./panupload.css";
import { useFormik } from "formik";

function PANUpload() {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { handleSubmit, getFieldProps, values, setFieldValue } = useFormik({
    initialValues: {
      fullname: "",
      panNumber: "",
      declaration: false,
      panImage: null,
    },
    onSubmit: async (value) => {
      try {
        const response = await toast.promise(
          add,
          {
            loading: "Logging...",
            success: (response) => {
              return <b>{response.msg || "Login Successfully!"}</b>;
            },
            error: (error) => {
              return <b>{error.msg || "Could not Login"}</b>;
            },
          }
        );

        // Simulate API response
        // const response = await addPanCard(value);
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
        setImagePreview(reader.result);
        setFieldValue("panImage", reader.result); // Update Formik field
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid JPEG file.");
    }
  };

  const removePreview = () => {
    setImagePreview(null);
    setFieldValue("panImage", null); // Clear Formik field
    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input value
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input element not found");
    }
  };

  return (
    <div className="pan-upload-wrapper">
      <Toaster position="bottom-right" />
      <div className="pan-upload-container">
        <div className="pan-upload-head">
          <label htmlFor="">PAN Card Information</label>
        </div>
        <form onSubmit={handleSubmit} className="pan-upload-form">
          <div className="panupload-name">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="_pan-name"
              placeholder="Full Name (same as PAN)"
              {...getFieldProps("fullname")}
            />
          </div>
          <div className="panupload-no">
            <label htmlFor="">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              id="_pan-no"
              placeholder="PAN Card Number"
              {...getFieldProps("panNumber")}
              onChange={(e) =>
                setFieldValue("panNumber", e.target.value.toUpperCase())
              }
              value={values.panNumber}
            />
          </div>
          <div
            className="panupload-img"
            onClick={() => fileInputRef.current?.click()}
          >
            {!imagePreview ? (
              <>
                <label htmlFor="_pan-img" onClick={(e) => e.stopPropagation()}>
                  UPLOAD PANCARD
                </label>
                <input
                  type="file"
                  name="panImage"
                  id="_pan-img"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange} // Handle file change
                  ref={fileInputRef} // Attach ref here
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
              <input
                type="file"
                name="panImage"
                id="_pan-img"
                accept=".jpg,.jpeg"
                onChange={handleFileChange} // Handle file change
                ref={fileInputRef} // Attach ref here
                style={{ display: "none" }}
              />
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
              checked={values.declaration}
              onChange={(e) => setFieldValue("declaration", e.target.checked)}
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
            disabled={!values.declaration}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default PANUpload;
