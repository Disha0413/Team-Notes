import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/notes", { title, content });
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to create note");
    }
  };

  return (
    <div className="container">
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />

        <button type="submit">Create Note</button>

        <p>
          <Link to="/dashboard">← Back to Dashboard</Link>
        </p>
      </form>
    </div>
  );
}