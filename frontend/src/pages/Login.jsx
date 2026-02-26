import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("Login response:", res.data);

      const { token, role } = res.data;
      if (!token) return alert("Login failed: no token received");

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Login Failed");
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