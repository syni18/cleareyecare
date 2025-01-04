import React, { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      // Convert selected image to base64 and set preview
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
      console.log("PAN Card uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading PAN Card:", error);
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
            />
          </div>
          <div className="panupload-img">
            <label htmlFor="_pan-img">
              Upload PAN <span>(Only JPEG allowed)</span>
            </label>
            <input
              type="file"
              name="panImage"
              id="_pan-img"
              accept=".jpg,.jpeg"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="PAN Preview" />
              </div>
            )}
          </div>
          <div className="pan-upload-declare">
            <input
              type="checkbox"
              name="declaration"
              id="_declaration"
              checked={formData.declaration}
              onChange={handleInputChange}
            />
            <p className="pan-declare-text">
              I do hereby declare that the PAN furnished/stated above is correct
              and belongs to me, registered as an account holder with
              www.cleareyelens.com. I further declare that I shall solely be
              held responsible for any consequences in case of a false PAN
              declaration.
            </p>
          </div>
          <button type="submit" className="pan-uploadbtn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default PANUpload;
