require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes); // notes CRUD

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});