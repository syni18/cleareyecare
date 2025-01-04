import React, { useState } from "react";
import "./panupload.css";
import { addPanCard } from "../../helper/helper";
import { IdCard } from "lucide-react";

function PANUpload() {
  const [formData, setFormData] = useState({
    fullName: "",
    panNumber: "",
    declaration: false,
    panImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    console.log(files);

    // Convert selected image to base64 format
    const imagePromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(files);
    });

    // Wait for the image to be converted to base64
    imagePromise
      .then((base64Image) => {
        setFormData({ ...formData, panImage: base64Image });
      })
      .catch((error) => {
        console.error("Error converting image to base64:", error);
      });
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
              <IdCard />
            </span>
            <label htmlFor="_pan-img">
              Upload PAN <span>(Only JPEG allowed)</span>
            </label>
            <input
              type="file"
              name="panImage"
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
