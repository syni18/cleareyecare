import React, { useState, useRef } from "react";
import "./panupload.css";
import { addPanCard } from "../../helper/helper";
import { useFormik } from "formik";

function PANUpload() {
  const { handleSubmit, getFieldProps, values, setFieldValue } = useFormik({
    initialValues: {
      fullname: "",
      panNumber: "",
      declaration: false,
      panImage: null,
    },
    onSubmit: async (value) => {
      try {
        console.log("val", value);
        
        // const response = await addPanCard(formData);
        console.log(response.data);
      } catch (error) {
        console.error("Error adding PAN Card:", error);
      }
    }
  })

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, panImage: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid JPEG file.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await addPanCard(formData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error adding PAN Card:", error);
  //   }
  // };

  const removePreview = () => {
    setImagePreview(null);
    setFormData({ ...formData, panImage: null });
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
          <label htmlFor="">PAN Card Information</label>
        </div>
        <form onSubmit={handleSubmit} className="pan-upload-form">
          <div className="panupload-name">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="_pan-name"
              placeholder="Full Name(same as PAN)"
             {...getFieldProps('fullname')}
            />
          </div>
          <div className="panupload-no">
            <label htmlFor="">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              id="_pan-no"
              placeholder="Pan card Number"
              {...getFieldProps('panNumber')}
            />
          </div>
          <div
            className="panupload-img"
            onClick={() => fileInputRef.current?.click()}
          >
            {!imagePreview ? (
              <>
                <label htmlFor="_pan-img" onClick={(e) => e.stopPropagation()}>
                  Upload PAN <span>(Only JPEG allowed)</span>
                </label>
                <input
                  type="file"
                  name="panImage"
                  id="_pan-img"
                  accept=".jpg,.jpeg"
                  {...getFieldProps('panImage')}
                  ref={fileInputRef} // Attach ref here
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
                {...getFieldProps('panImage')}
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
              onChange={handleInputChange}
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
