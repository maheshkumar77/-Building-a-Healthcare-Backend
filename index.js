const express=require("express");
const conect=require("./db");
const authRoutes=require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const patientRoutes = require("./routes/patients");
const app=express();
app.use(express.json());




// app.post("/pdata",(req,res)=>{
//     const {name,id,phoneno,adress}=req.body;
//     const requestq='INSERT INTO demost (name,id,phoneno,address) VALUES ($1,$2,$3,$4) '
//     conect.query(requestq,[name,id,phoneno,adress],(err,result)=>{
//         if(err){
//             console.log(err);
//             res.status(400).send("error in query");
//         }else{
//             console.log(result);
//             res.status(200).send("data is posted sucesss fully");
//         }
//     })
// })
// app.get("/getdata",(req,res)=>{
//     const fatch_q="SELECT * FROM demost"
//     conect.query(fatch_q,(err,result)=>{
//         if(err){
//             console.log(err);
//             res.status(400).send(err);
//         }else{
//             console.log(result);
//             res.status(200).send(result.rows);
//         }
//     })
// })
// app.get("/getdata/:id",(req,res)=>{
//     const id=req.params.id
//     const f_query="SELECT * FROM demost where id = $1"
//     conect.query(f_query,[id],(err,result)=>{
//         if(err){
//             res.status(400).send(err)
//         }else{
//             res.status(200).send(result.rows);
//         }
//     })
// })

// app.put("/getdata/:id", (req, res) => {
//     const id = req.params.id;
//     const { name, phoneno, address } = req.body;
//     console.log(address)

//     // Corrected SQL query with proper WHERE clause
//     const p_query = "UPDATE demost SET name = $1, phoneno = $2, address = $3 WHERE id = $4";

//     conect.query(p_query, [name, phoneno, address, id], (err, result) => {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             console.log("Updated successfully");
//             res.status(200).send(result.rows);  // This sends the result rows (you might want to send a success message instead)
//         }
//     });
// });

// app.delete("/getdata/:id", (req, res) => {
//     const id = req.params.id;

//     const p_query = "DELETE FROM demost WHERE id = $1";

//     conect.query(p_query, [id], (err, result) => {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             console.log("Record deleted successfully");
//             res.status(200).send("Record deleted successfully");
//         }
//     });
// });

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

app.listen(5001, () => {
    console.log("Server is running at http://localhost:5001");
});
