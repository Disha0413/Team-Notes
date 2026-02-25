import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return alert("You are not logged in");

        const res = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

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
      const token = localStorage.getItem("authToken");
      if (!token) return alert("You are not logged in");

      await axios.put(
        `http://localhost:5000/api/notes/${id}`, // ✅ PUT for updating
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Note updated ✅");
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err);
      alert(err.response?.data?.message || "Update failed ❌");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Note {id}</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          required
        />
        <br /><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
          required
        />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";


// export default function EditNote() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   // Fetch existing note data
//   useEffect(() => {
//     axios.get(`http://localhost:5000/notes/${id}`)
//       .then(res => {
//         setTitle(res.data.title);
//         setContent(res.data.content);
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("authToken");

// await axios.put(
//   `http://localhost:5000/notes/${id}`,
//   { title, content },
//   { headers: { Authorization: `Bearer ${token}` } }
// );
//       alert("Note updated ✅");
//       navigate("/dashboard");
//     } catch (err) {
//       console.log(err);
//       alert("Update failed ❌");
//     }
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Edit Note {id}</h1>
//       <form onSubmit={handleSubmit}>
//         <input 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//           placeholder="Enter title" 
//           required 
//         />
//         <br /><br />
//         <textarea 
//           value={content} 
//           onChange={(e) => setContent(e.target.value)} 
//           placeholder="Enter content" 
//           required 
//         />
//         <br /><br />
//         <button>Update</button>
//       </form>
//     </div>
//   );
// }