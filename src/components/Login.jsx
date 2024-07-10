// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // Clear error on successful login
      navigate("/todolist");
    } catch (error) {
      setError(error.message);
    }
  };

  return (

    <div>
      <h2  >Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button    onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
