import React from 'react'
import { Minimize } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function AuthLeftBox() {
  const navigate = useNavigate();
    const handleCloseBox = () => {
      navigate("/");
    };
  return (
    <>
      {" "}
      <span className="auth-wrap-close" onClick={handleCloseBox}>
        <Minimize /> <span className="auth-wrcl-text">Close</span>
      </span>
      <div className="loco-left"></div>
    </>
  );
}

export default AuthLeftBox