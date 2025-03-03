const express = require("express");
const db = require("../db");  
const auth = require("../middlewares/auth");
const router = express.Router();

//Add a Patient
router.post("/", auth, async (req, res) => {
    const { name, age, disease } = req.body;  
    const userId = req.user.id;
    
    try {
        const query = "INSERT INTO patient (name, age, disease, user_id) VALUES ($1, $2, $3, $4)";
        const result = await db.query(query, [name, age, disease, userId]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding patient", error });
    }
});

//Get All Patients for the Logged-in User
router.get("/", auth, async (req, res) => {
    const userId = req.user.id;
    
    try {
        const query = "SELECT * FROM patient WHERE user_id = $1";
        const result = await db.query(query, [userId]);
        
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching patients", error });
    }
});

//Get Patient by ID (Ensure the patient belongs to the logged-in user)
router.get("/:id", auth, async (req, res) => {
    const userId = req.user.id;
    
    try {
        const query = "SELECT * FROM patient WHERE id = $1 AND user_id = $2";
        const result = await db.query(query, [req.params.id, userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found or unauthorized" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching patient", error });
    }
});

//Update Patient (Only if it belongs to the user)
router.put("/:id", auth, async (req, res) => {
    const { name, age, disease } = req.body;
    const userId = req.user.id;
    
    try {
        const query = "UPDATE patient SET name = $1, age = $2, disease = $3 WHERE id = $4 AND user_id = $5";
        const result = await db.query(query, [name, age, disease, req.params.id, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Patient not found or unauthorized" });
        }

        res.json({ message: "Updated successfully", patient: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating patient", error });
    }
});

//Delete Patient (Only if it belongs to the user)
router.delete("/:id", auth, async (req, res) => {
    const userId = req.user.id;
    
    try {
        const query = "DELETE FROM patient WHERE id = $1 AND user_id = $2";
        const result = await db.query(query, [req.params.id, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Patient not found or unauthorized" });
        }

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting patient", error });
    }
});

module.exports = router;
