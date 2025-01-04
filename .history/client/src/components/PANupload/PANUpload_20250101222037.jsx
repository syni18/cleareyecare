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
    const files = e.target.files[0];
    console.log(files);

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
    console.log(formData);
    try {
      const response = await addPanCard(formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding PAN Card:", error);
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
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="panupload-no">
            <label htmlFor="">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              id="_pan-no"
              placeholder="Pan card Number"
              value={formData.panNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="panupload-img">
            <span className="pan-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#59839d"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-id-card"
              >
                <path d="M16 10h2" />
                <path d="M16 14h2" />
                <path d="M6.17 15a3 3 0 0 1 5.66 0" />
                <circle cx="9" cy="11" r="2" />
                <rect x="2" y="5" width="20" height="14" rx="2" />
              </svg>
            </span>
            <label htmlFor="_pan-img">
              Upload PAN <span>(Only JPEG allowed)</span>
            </label>
            <input
              type="file"
              name="panImage"
              accept=".jpg, .jpeg"
              id="_pan-img"
              
              onChange={handleFileChange}
            />
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
              I do hereby declare that PAN furnished/stated above is correct and
              belongs to me, registered as an account holder with
              www.cleareyelens.com. I further declare that I shall solely be
              held responsible for the consequences, in case of any false PAN
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
