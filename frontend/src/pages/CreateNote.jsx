import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

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
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br /><br />

        <button>Create</button>
      </form>
    </div>
  );
}
