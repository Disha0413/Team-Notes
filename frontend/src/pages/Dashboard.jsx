import { Link } from "react-router-dom";

export default function Dashboard() {
  const notes = [
    { id: 1, title: "First note", content: "This is my first note" },
    { id: 2, title: "Second note", content: "Learning system design" },
  ];

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <Link to="/notes/new">
        <button>Create Note</button>
      </Link>

      <div style={{ marginTop: 20 }}>
        {notes.map((note) => (
          <div
            key={note.id}
            style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <Link to={`/notes/${note.id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}