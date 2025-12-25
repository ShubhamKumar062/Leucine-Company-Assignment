require("dotenv").config();
const express = require("express");
const connectedDB = require("./config/db.js")
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js")

const app = express()
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes)
const PORT = process.env.PORT

connectedDB.then(()=>{
    app.listen(PORT , ()=>{
    console.log(`Server is Connected on ${PORT}`)
})
}).catch((err) =>{
    console.log(`Server is not working`,err)
})


