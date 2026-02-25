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

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
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

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import API from "../api/axios"; // import the Axios instance

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", { email, password });

//       // Extract token from response
//       const token = res.data.token;
//       if (!token) {
//         alert("Login failed: no token received");
//         return;
//       }

//       // Store token in localStorage
//       localStorage.setItem("authToken", token);

//       //Navigate to dashboard
//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err.response?.data || err);
//       alert("Login Failed");
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit">Login</button>

//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }