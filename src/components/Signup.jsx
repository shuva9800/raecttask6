// src/components/Signup.jsx
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
     
      });
      setError(""); // Clear error on successful signup
      navigate("/todolist");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
        <div>
    <h1  >TodoList</h1>
  </div>
      <h2   >Sign Up</h2>
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
      <div >
      <button    onClick={handleSignup}>Sign Up</button>
      <a  href="/login"><button>login</button></a></div>
    </div>
  );
};

export default Signup;
