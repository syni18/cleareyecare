import React from "react";

function Signup() {
  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        {/* Replace this div with an <img> tag pointing to your uploaded image URL */}
        <img
          src="path-to-your-image.png"
          alt="Signup illustration"
          style={styles.image}
        />
      </div>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>
            Don't have an account?{" "}
            <a href="/signup" style={styles.signupLink}>
              Sign up
            </a>
          </p>
        </div>
        <div style={styles.socialSignup}>
          <button style={styles.socialButton}>Google</button>
          <button style={styles.socialButton}>Apple ID</button>
        </div>
        <p style={styles.orText}>Or continue with email address</p>
        <form style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            style={styles.input}
          />
          <input type="password" placeholder="Password" style={styles.input} />
          <button type="submit" style={styles.submitButton}>
            Start trading
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  image: {
    width: "80%",
    maxWidth: "400px",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
  },
  signupLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  socialSignup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  socialButton: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  orText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#aaa",
    margin: "20px 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;
