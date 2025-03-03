const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin123",
    database: "postgres"
});

//Test the connection
pool.connect()
    .then(() => console.log("Connected successfully to PostgreSQL"))
    .catch(err => console.error("Database connection error:", err.stack));

module.exports = pool;
