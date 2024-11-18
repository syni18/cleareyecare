import React from 'react'
import { Minimize } from "lucide-react";

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
      <div className="loco-left">
        {/* awesome some background style */}
        <h1>Welcome,</h1>
        <h3>
          Looks like you're new here!
          {/* <br /> Wishlist and Recommendations */}
        </h3>
        <h5>
          Sign up with your mobile number
          <br /> to get started
        </h5>
      </div>
    </>
  );
}

export default AuthLeftBox