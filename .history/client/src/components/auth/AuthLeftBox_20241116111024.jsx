import React from 'react'

function AuthLeftBox() {
    const handleCloseBox = () => {
      navigate("/");
    };
  return (
    <div>
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
    </div>
  );
}

export default AuthLeftBox