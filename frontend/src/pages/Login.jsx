import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios"; // import the Axios instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      // 1️⃣ Extract token from response
      const token = res.data.token;
      if (!token) {
        alert("Login failed: no token received");
        return;
      }

      // 2️⃣ Store token in localStorage
      localStorage.setItem("authToken", token);

      // 3️⃣ Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}