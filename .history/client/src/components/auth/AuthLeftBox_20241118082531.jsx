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
      
    </>
  );
}

export default AuthLeftBox