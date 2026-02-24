import { useParams } from "react-router-dom";
import { useState } from "react";

export default function EditNote() {
  const { id } = useParams();

  const [title, setTitle] = useState("Sample title");
  const [content, setContent] = useState("Sample content");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, title, content);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Note {id}</h1>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <br /><br />

        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <br /><br />

        <button>Update</button>
      </form>
    </div>
  );
}