import React from 'react'

function Signup() {
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
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
        <div className="loco-right">
          {/* login form */}
          <form
            action="#"
            className="sec-form-wrapper"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="name-help">Enter Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              id="name-help"
              {...formik.getFieldProps("fullname")}
            />
            <label htmlFor="email-help">Enter Your Email</label>
            <input
              type="text"
              placeholder="johndoe@domain.com"
              id="email-help"
              {...formik.getFieldProps("email")}
            />
            <label htmlFor="email-help">Enter Password</label>
            <input
              type="password"
              placeholder="*******"
              id="paswd-help"
              {...formik.getFieldProps("password")}
            />
            <p>
              By continuing, you agree to Cleareyecare's <em>Terms of Use</em>{" "}
              and <em>Privacy Policy</em>.
            </p>
            <button type="submit">Sign up</button>
            <button type="button">
              <Link to="/login" className="login-linkbtn">
                Login
              </Link>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup