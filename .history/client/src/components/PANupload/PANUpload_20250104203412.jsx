import React, { useState, useRef, useEffect } from "react";
import "./panupload.css";
import { useFormik } from "formik";
import { addPanCard, getPancardDetails } from "../../helper/helper";
import { pancardValidation } from "../../helper/validate";
import toast, { Toaster } from "react-hot-toast";
import imageCompression from "browser-image-compression";

const PANUpload = React.memo(() => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(true); // Flag to check if user can edit
  const fileInputRef = useRef(null);

  const { handleSubmit, getFieldProps, values, setFieldValue, setValues } =
    useFormik({
      initialValues: {
        fullname: "",
        panNumber: "",
        declaration: false,
        panImage: null,
      },
      validate: pancardValidation,
      validateOnBlur: false, // Disable validation on blur
      validateOnChange: false,
      onSubmit: async (values) => {
        try {
          const response = await toast.promise(addPanCard(values), {
            loading: "Uploading...",
            success: (response) => {
              return <b>{response.msg || "PAN Card verified successfully!"}</b>;
            },
            error: (error) => {
              return <b>{error.msg || "Could not verify PAN Card!"}</b>;
            },
          });
        } catch (error) {
          console.error("Error adding PAN Card:", error);
        }
      },
    });

  useEffect(() => {
    const pandetails = async () => {
      try {
        const getPan = await getPancardDetails();
        if (getPan.success) {
          // Only update state if data has changed
          setValues((prevValues) => {
            const newValues = {
              fullname: getPan.data.fullname,
              panNumber: getPan.data.panNumber,
              declaration: getPan.data.declaration,
              panImage: getPan.data.panImage,
            };

            // Check if the new values are different from the previous ones
            if (JSON.stringify(prevValues) !== JSON.stringify(newValues)) {
              return newValues;
            }
            return prevValues; // No change
          });

          // Set image preview only if it has changed
          const newImagePreview = `data:image/jpeg;base64,${getPan.data.panImage}`;
          if (newImagePreview !== imagePreview) {
            setImagePreview(newImagePreview);
          }

          setIsEditing(false); // Set editing flag to false after fetching details
        }
      } catch (error) {
        console.error("Error fetching PAN details:", error);
        toast.error("Failed to fetch PAN details. Please try again.");
      }
    };

    pandetails();

    // Cleanup function to handle unmounted component scenario
    return () => {
      setValues({
        fullname: "",
        panNumber: "",
        declaration: false,
        panImage: null,
      });
      setImagePreview(null);
    };
  }, []); // Empty dependency array to run once on mount

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        toast.error("Please select a valid JPEG file.");
        return;
      }

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        // Create a preview URL for the compressed file
        const previewUrl = URL.createObjectURL(compressedFile);
        setImagePreview(previewUrl); // Update the preview

        const reader = new FileReader();
        reader.onload = () => {
          // setImagePreview(reader.result);
          setFieldValue("panImage", reader.result.split(",")[1]);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
        toast.error(
          "An error occurred while processing the image. Please try again."
        );
      }
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
            <label htmlFor="_pan-name">Full Name</label>
            <input
              type="text"
              name="fullname"
              id="_pan-name"
              placeholder="Full Name (same as PAN)"
              {...getFieldProps("fullname")}
              disabled={!isEditing} // Disable if not editing
            />
          </div>
          <div className="panupload-no">
            <label htmlFor="_pan-no">PAN Number</label>
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
              disabled={!isEditing} // Disable if not editing
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
                  disabled={!isEditing} // Disable if not editing
                />
              </>
            ) : (
              <img src={imagePreview} alt="PAN Preview" />
            )}
          </div>
          {imagePreview && (
            <div className="imgview-wrap">
              {isEditing && (
                <button
                  type="button"
                  className="imgview-remove"
                  onClick={removePreview}
                >
                  Remove
                </button>
              )}
              <input
                type="file"
                name="panImage"
                id="_pan-img"
                accept=".jpg,.jpeg"
                onChange={handleFileChange} // Handle file change
                ref={fileInputRef} // Attach ref here
                style={{ display: "none" }}
                disabled={!isEditing} // Disable if not editing
              />
              {isEditing && (
                <button
                  type="button"
                  className="imgview-change"
                  onClick={triggerFileInput}
                >
                  Change
                </button>
              )}
            </div>
          )}
          <div className="pan-upload-declare">
            <input
              type="checkbox"
              name="declaration"
              id="_declaration"
              checked={values.declaration}
              onChange={(e) => setFieldValue("declaration", e.target.checked)}
              disabled={!isEditing} // Disable if not editing
            />
            <p className="pan-declare-text">
              I do hereby declare that PAN furnished/stated above is correct and
              belongs to me, registered as an account holder with
              www.cleareyelens.com. I further declare that I shall solely be
              held responsible for the consequences, in case of any false PAN
              declaration.
            </p>
          </div>
          {isEditing && (
            <button
              type="submit"
              className="pan-uploadbtn"
              disabled={!values.declaration}
            >
              Upload
            </button>
          )}
        </form>
      </div>
    </div>
  );
});

export default PANUpload;
