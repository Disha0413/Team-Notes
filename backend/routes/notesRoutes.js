const express = require("express");
const router = express.Router();
const pool = require("../db");
const {protect, authorize}= require("../middleware/authMiddleware.js");
const noteSchema = require("../validation/notesValidation");

router.post("/", protect, async (req, res, next) => {
  try {
    //VALIDATION
    const { error } = noteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //SAFE TO USE DATA
    const { title, content } = req.body;
    const authorId = req.user.id;

    //DB INSERT
    const newNote = await pool.query(
      "INSERT INTO notes (title, content, author_id) VALUES ($1,$2,$3) RETURNING *",
      [title, content, authorId]
    );

    res.status(201).json(newNote.rows[0]);

  } catch (err) {
  next(err);
}
});

router.get("/", protect, async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const authorId = req.user.id;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    //count query FIRST
    const countResult = await pool.query(
      `
      SELECT COUNT(*) FROM notes
      WHERE author_id = $1
      AND (title ILIKE $2 OR content ILIKE $2)
      `,
      [authorId, `%${search}%`]
    );

    const total = parseInt(countResult.rows[0].count);

    //data query
    const result = await pool.query(
      `
      SELECT * FROM notes
      WHERE author_id = $1
      AND (title ILIKE $2 OR content ILIKE $2)
      ORDER BY created_at DESC
      LIMIT $3 OFFSET $4
      `,
      [authorId, `%${search}%`, limitNum, offset]
    );

    res.json({
      data: result.rows,
      total: total
    });

  } catch (err) {
  next(err);
}
});

router.put("/:id", protect, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const authorId = req.user.id;

    const updatedNote = await pool.query(
      "UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND author_id = $4 RETURNING *",
      [title, content, id, authorId]
    );

    if (updatedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote.rows[0]);

  } catch (err) {
  next(err);
}
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorId = req.user.id;

    const deletedNote = await pool.query(
      "DELETE FROM notes WHERE id = $1 AND author_id = $2 RETURNING *",
      [id, authorId]
    );

    if (deletedNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });

  } catch (err) {
  next(err);
}
});

module.exports = router;