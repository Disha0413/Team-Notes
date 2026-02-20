const { Pool } = require("pg");

// ⭐ Create Postgres connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "team_notes",
  password: "12345678",
  port: 5432,
});

module.exports = pool;