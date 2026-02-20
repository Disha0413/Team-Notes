const express = require("express");
const router = express.Router();
const pool = require("../db");
const { protect, authorize } = require("../middleware/authMiddleware");

// CREATE note
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title & content required" });
    }

    const authorId = req.user.id;

    const newNote = await pool.query(
      "INSERT INTO notes (title, content, author_id) VALUES ($1,$2,$3) RETURNING *",
      [title, content, authorId]
    );

    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all notes for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const authorId = req.user.id;
    const notes = await pool.query(
      "SELECT * FROM notes WHERE author_id = $1 ORDER BY created_at DESC",
      [authorId]
    );
    res.json(notes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a note
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const authorId = req.user.id;

    const updatedNote = await pool.query(
      "UPDATE notes SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 AND author_id=$4 RETURNING *",
      [title, content, id, authorId]
    );

    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a note
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    const deletedNote = await pool.query(
      "DELETE FROM notes WHERE id=$1 AND author_id=$2 RETURNING *",
      [id, authorId]
    );

    if (deletedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;











// const express = require("express");
// const router = express.Router();
// const pool = require("../db");
// const {protect, authorize}= require("../middleware/authMiddleware.js");

// // ⭐ CREATE NOTE
// router.post("/", protect, async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     // validation
//     if (!title || !content) {
//       return res.status(400).json({ message: "Title & content required" });
//     }

//     // ⭐ author_id comes from token
//     const authorId = req.user.id;

//     const newNote = await pool.query(
//       "INSERT INTO notes (title, content, author_id) VALUES ($1,$2,$3) RETURNING *",
//       [title, content, authorId]
//     );

//     res.status(201).json(newNote.rows[0]);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // GET all notes
// router.get("/", protect, async (req, res) => {
//   try {
//     const authorId = req.user.id;

//     const notes = await pool.query(
//       "SELECT * FROM notes WHERE author_id = $1 ORDER BY created_at DESC",
//       [authorId]
//     );

//     res.json(notes.rows);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // UPDATE note by ID
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const { id } = req.params;
//     const authorId = req.user.id;

//     const updatedNote = await pool.query(
//       "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND author_id = $4 RETURNING *",
//       [title, content, id, authorId]
//     );

//     if (updatedNote.rows.length === 0) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.json(updatedNote.rows[0]);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // DELETE note by ID
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const authorId = req.user.id;

//     const deletedNote = await pool.query(
//       "DELETE FROM notes WHERE id = $1 AND author_id = $2 RETURNING *",
//       [id, authorId]
//     );

//     if (deletedNote.rows.length === 0) {
//       return res.status(404).json({ message: "Note not found" });
//     }

//     res.json({ message: "Note deleted successfully" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;