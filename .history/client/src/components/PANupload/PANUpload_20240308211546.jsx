import React from 'react'
import './panupload.css';


function PANUpload() {
  
  return (
    <div className="pan-upload-wrapper">
      <div className="pan-upload-container">
        <div className="pan-upload-head">
          <label htmlFor="">PAN Card Information</label>
        </div>
        <form action="" className="pan-upload-form">
          <div className="panupload-name">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name="full-name"
              id="_pan-name"
              placeholder="Full Name(same as PAN)"
            />
          </div>
          <div className="panupload-no">
            <label htmlFor="">PAN Number</label>
            <input
              type="text"
              name="pan-no"
              id="_pan-no"
              placeholder="Pan card Number"
            />
          </div>
          <div className="panupload-img">
            <label htmlFor="">
              Upload PAN <span>(Only JPEG allowed)</span>
            </label>
            <input type="file" name="pan-upload" id="_pan-img" />
          </div>
          <div className="pan-upload-declare">
            <input type="checkbox" name="delaration" id="_declaration" />
            <p className='pan-declare-text'>
              I do hereby declare that PAN furnished/stated above is correct and
              belongs to me, registered as an account holder with
              www.cleareyelens.com. I further declare that I shall solely be held
              responsible for the consequences, in case of any false PAN
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