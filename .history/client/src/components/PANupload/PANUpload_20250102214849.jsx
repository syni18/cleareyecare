import React, { useState, useRef } from "react";
import "./panupload.css";
import { addPanCard } from "../../helper/helper";

function PANUpload() {
  const [formData, setFormData] = useState({
    fullName: "",
    panNumber: "",
    declaration: false,
    panImage: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPanCard(formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding PAN Card:", error);
    }
  };

  const removePreview = () => {
    setImagePreview(null);
    setFormData({ ...formData, panImage: null });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on the input ref
    }
  };

  return (
    <div className="pan-upload-wrapper">
      <div className="pan-upload-container">
        <div className="pan-upload-head">
          <label>PAN Card Information</label>
        </div>
        <form onSubmit={handleSubmit} className="pan-upload-form">
          <div className="panupload-name">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name (same as PAN)"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="panupload-no">
            <label>PAN Number</label>
            <input
              type="text"
              name="panNumber"
              placeholder="PAN Card Number"
              value={formData.panNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="panupload-img">
            {!imagePreview ? (
              <>
                <label htmlFor="_pan-img">
                  Upload PAN <span>(Only JPEG allowed)</span>
                </label>
                <input
                  type="file"
                  name="panImage"
                  accept=".jpg,.jpeg"
                  onChange={handleFileChange}
                  ref={fileInputRef} // Attach ref here
                  style={{ display: 'none' }} // Hide the input
                />
                <button type="button" onClick={triggerFileInput}>
                  Choose File
                </button>
              </>
            ) : (
              <>
                <img src={imagePreview} alt="PAN Preview" />
                <div className="imgview-wrap">
                  <button type="button" className="imgview-remove" onClick={removePreview}>
                    Remove
                  </button>
                  <button type="button" className="imgview-change" onClick={triggerFileInput}>
                    Change
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="pan-upload-declare">
            <input
              type="checkbox"
              name="declaration"
              id="_declaration"
              checked={formData.declaration}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="_declaration" className="pan-declare-text">
              I declare that the PAN furnished is correct and belongs to me. I shall be responsible for any consequences of false declaration.
            </label>
          </div>
          <button type="submit" className="pan-uploadbtn">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default PANUpload;
