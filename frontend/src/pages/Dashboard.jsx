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
      const res = await API.get(
        `/notes?page=${page}&limit=${limit}&search=${search}`
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
      await API.delete(`/notes/${id}`);
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
    <div className="container">
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* ACTION BAR */}
      <div style={{ display: "flex", gap: 10 }}>
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
      </div>

      {/* NOTES LIST */}
      <div>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <div key={note.id} className="card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>

              <div style={{ display: "flex", gap: 10 }}>
                <Link to={`/notes/${note.id}/edit`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>

      {/* PAGINATION */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 20
        }}
      >
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}