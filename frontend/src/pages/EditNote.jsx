import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.log(err.response?.data || err);
        alert("Failed to fetch note");
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/notes/${id}`, { title, content });
      alert("Note updated ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  return (
    <div className="container">
      <h1>Edit Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Edit your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
        />

        <button type="submit">Update Note</button>

        <p>
          <Link to="/dashboard">← Back to Dashboard</Link>
        </p>
      </form>
    </div>
  );
}