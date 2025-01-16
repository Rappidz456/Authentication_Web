"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import Alert from "@mui/material/Alert";
import '../styles.css';
import { CircularProgress } from "@mui/material";

const firebaseConfig = {
  apiKey: "AIzaSyDK1F0-WuNBPw1w86CBl44x3YpN2lXamtg",
  authDomain: "next-js-authentication-b53c5.firebaseapp.com",
  projectId: "next-js-authentication-b53c5",
  storageBucket: "next-js-authentication-b53c5.firebasestorage.app",
  messagingSenderId: "639937720626",
  appId: "1:639937720626:web:d9bf03ef53ac1d863ba72b",
  measurementId: "G-NL5Y25TYVG",
};

const app = initializeApp(firebaseConfig);

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("firebase/analytics").then(() => getAnalytics(app));
    }
  }, []);
  const onSubmitForm = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const trimEmail = email.trim();
    try {
      const auth = getAuth();
      const user = await sendPasswordResetEmail(
        auth,
        trimEmail,
      );
      return {
        user
      }
    } catch (error: any) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <form action="" onSubmit={onSubmitForm}>
          <h1>Reset Password</h1>

          {/* Success Alert */}
          {success && (
            <Alert severity="success" style={{ marginBottom: "10px" }}>
              Login successful! Redirecting to home page...
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert severity="error" style={{ marginBottom: "10px" }}>
              {error}
            </Alert>
          )}

          <div className="input-box">
            <input
              value={email}
              type="email"
              placeholder="Email"
              required
              onChange={(text) => setEmail(text.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
          </div>
          <button type="submit" className="button">
            {loading ? <CircularProgress color="inherit" size={20} /> : "Reset Password"}
          </button>
        </form>
        <div className="register-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;