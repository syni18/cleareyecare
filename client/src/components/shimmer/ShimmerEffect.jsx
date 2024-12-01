import './shimmerEffect.css';

export const SignUpShimmer = () => (
  <section className="login-wrapper shimmer">
    <div className="login-container">
      <AuthLeftBoxShimmer />
      <div className="loco-right">
        <span className="lort-already shimmer-item">
          <div className="lrtady-link shimmer-item">
            <span className="lrtady-span-text shimmer-item">
              Already have an account?
            </span>
            <span className="lrtady-login shimmer-item">Login</span>
          </div>
        </span>
        <div className="lort-box">
          <span className="lrtb-header shimmer-item">Sign Up</span>
          <span className="lr-box-auto social-signup">
            <div className="social-btn google-btn shimmer-item">
              <GoogleSvgShimmer />
              <span className="shimmer-item">Google</span>
            </div>
            <div className="social-btn facebook-btn shimmer-item">
              <FacebookSvgShimmer />
              <span className="shimmer-item">Facebook</span>
            </div>
          </span>
          <div className="horizontal-divider-with-text shimmer-item">
            Or continue with email address
          </div>
          <form className="login-form-wrapper">
            <div className="lfw-name">
              {["firstname", "lastname"].map((field, index) => (
                <span key={index} className="shimmer-item">
                  <FormFieldShimmer
                    label={field === "firstname" ? "First Name" : "Last Name"}
                  />
                </span>
              ))}
            </div>
            <FormFieldShimmer label="Enter Email Address" />
            <FormFieldShimmer label="Enter your Password" />
            <button type="button" className="shimmer-item">
              Start Shopping
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// Example shimmer for AuthLeftBox
const AuthLeftBoxShimmer = () => (
  <div className="auth-left-box shimmer-item">Loading...</div>
);

// Example shimmer for FormField
const FormFieldShimmer = ({ label }) => (
  <div className="form-field-shimmer">
    <label className="shimmer-item">{label}</label>
    <div className="input-shimmer shimmer-item"></div>
  </div>
);

// Example shimmer for SVGs
const GoogleSvgShimmer = () => (
  <div className="google-svg shimmer-item">Google Icon</div>
);
const FacebookSvgShimmer = () => (
  <div className="facebook-svg shimmer-item">Facebook Icon</div>
);
