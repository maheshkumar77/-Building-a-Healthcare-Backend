const express = require("express");
const db = require("../db");  
const auth = require("../middlewares/auth");
const router = express.Router();

//Add a Doctor
router.post("/", auth, async (req, res) => {
    try {
        const { id, name, specialization } = req.body;
        const query = "INSERT INTO doctordb (name, specialization) VALUES ($1, $2, $3) ";
        const result = await db.query(query, [id, name, specialization]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding doctor", error });
    }
});

//Get All Doctors
router.get("/", async (req, res) => {
    try {
        const query = "SELECT * FROM doctordb";
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching doctors", error });
    }
});

//Get Doctor by ID
router.get("/:id", async (req, res) => {
    try {
        const query = "SELECT * FROM doctordb WHERE id = $1";
        const result = await db.query(query, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching doctor", error });
    }
});

//Update Doctor
router.put("/:id", auth, async (req, res) => {
    try {
        const { name, specialization } = req.body;
        const query = "UPDATE doctordb SET name = $1, specialization = $2 WHERE id = $3 RETURNING *";
        const result = await db.query(query, [name, specialization, req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: "Updated successfully", doctor: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating doctor", error });
    }
});

//Delete Doctor
router.delete("/:id", auth, async (req, res) => {
    try {
        const query = "DELETE FROM doctordb WHERE id = $1 RETURNING *";
        const result = await db.query(query, [req.params.id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting doctor", error });
    }
});

module.exports = router;
