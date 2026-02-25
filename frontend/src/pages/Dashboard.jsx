import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return alert("You are not logged in");

      const res = await API.get(
        `/notes?page=${page}&limit=${limit}&search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page, search]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await API.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <Link to="/notes/new">
        <button>Create Note</button>
      </Link>

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <div style={{ marginTop: 20 }}>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <div
              key={note.id}
              style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
            >
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <Link to={`/notes/${note.id}/edit`}>
                <button>Edit</button>
              </Link>

              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          ))}
      </div>

      <div>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span style={{ margin: 10 }}>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      <div>
        <button onClick={handleLogout} style={{ marginLeft: 20 }}>
          Logout
        </button>
      </div>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function Dashboard() {
//   const [search, setSearch] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 5;

//   const fetchNotes = async () => {
//     try {
//       const res = await API.get(
//         `/notes?page=${page}&limit=${limit}&search=${search}`
//       );
//       setNotes(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, [page, search]);

//   const handleDelete = async (id) => {
//   try {
//     await API.delete(`/notes/${id}`);

//     // refresh list after delete
//     fetchNotes();
//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleLogout = () => {
//   localStorage.removeItem("authToken");
//   window.location.href = "/login";
// };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Dashboard</h1>

//       <Link to="/notes/new">
//         <button>Create Note</button>
//       </Link>

//       <input placeholder="Search notes..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1);}}/>
      
//       <div style={{ marginTop: 20 }}>
//         {Array.isArray(notes) &&
//           notes.map((note)=> (
//           <div
//             key={note.id}
//             style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
//           >
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>

//             <Link to={`/notes/${note.id}/edit`}>
//               <button>Edit</button>
//             </Link>

//             <button onClick={() => handleDelete(note.id)}> Delete </button>
//           </div>
//         ))}
//       </div>
//       <div>
//         <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
//         <span style={{ margin: 10 }}>Page {page}</span>
//         <button onClick={() => setPage((p) => p + 1)}>Next</button>
//       </div>
//       <div>
//         <button onClick={handleLogout} style={{ marginLeft: 20 }}>Logout</button>
//       </div>
//     </div>
//   );
// }