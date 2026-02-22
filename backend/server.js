require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());

app.use("/api/auth", authRoutes);  
app.use("/api/notes", notesRoutes);

app.use(errorHandler);
app.listen(5000, () => console.log("Server running on port 5000"));