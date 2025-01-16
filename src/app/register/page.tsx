"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "../styles.css";
import Checkbox from "@mui/material/Checkbox";
import { Alert } from "@mui/material";
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

const register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      import("firebase/analytics").then(() => getAnalytics(app));
    }
  }, []);

  const onSubmitForm = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();
    const trimEmail = email.trim();
    const trimPassword = password.trim();
    try {
      const auth = getAuth();
      const user = await createUserWithEmailAndPassword(
        auth,
        trimEmail,
        trimPassword
      );
      if (user) {
        setSuccess(true);
        setError(null);
        setEmail("");
        setPassword("");
        router.push("/home");
      }
      setLoading(false);
    } catch (error: any) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <form action="" onSubmit={onSubmitForm}>
          <h1>Register</h1>
          {/* Success Alert */}
          {success && (
            <Alert severity="success" style={{ marginBottom: "10px" }}>
              Registration successful! Redirecting to home page...
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
              type="text"
              placeholder="Username"
              required
              value={username}
              autoFocus
              onChange={(text) => setUsername(text.target.value)}
            />
            <i className="bx bxs-user"></i>
          </div>
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
          <div className="input-box">
            <input
              value={password}
              type="password"
              placeholder="password"
              required
              onChange={(text) => setPassword(text.target.value)}
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="remember-forgot">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                defaultChecked
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />{" "}
              <label>Remember me </label>
            </div>
          </div>
          <button type="submit" className="button">
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="register-link">
          <p>
            Have an Account? <a href="/">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default register;
