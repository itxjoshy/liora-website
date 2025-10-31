import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import logo from "../logo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const adminEmail = "lioraadmin@liora.com";

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === adminEmail) {
        navigate("/admin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user.email === adminEmail) {
        navigate("/admin");
      } else {
        setError("You are not authorized to access this page.");
      }
    } catch (err) {
      console.error(err.code, err.message);
      setError("Invalid email or password.");
    }
  };

  if (loading) {
    return <div className="admin-login-loader">Checking login status...</div>;
  }

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <img
          src={logo}
          alt=""
          style={{
            width: "40%",
          }}
        />
        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            color: "#da639c",
          }}
        >
          Admin Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
