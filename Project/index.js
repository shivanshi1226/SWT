const express = require("express")
const env = require("dotenv").config();
const cors = require("cors")
const connection = require("./config/db");
const auth = require("./Auth/auth.middleware");
const checkAdmin = require("./Auth/checkAdmin.middleware")
const userRouter = require("./Routes/user.Route")
const noteRouter = require("./Routes/note.Route")
const server = express();
const PORT = process.env.PORT || 3005
server.use(cors({
    origin: "*",
}))
server.use(express.json())
server.use('/user',userRouter)
server.use('/Note',auth , noteRouter)

server.get("/",(req,res)=>{
    res.send("Server is running fine")
})

server.listen(PORT, async()=>{
    try{
        await connection
        console.log(`Server is running on port ${PORT} and connected to db`)
    }
    catch(error){
        console.log(`Error connecting to db,${error}`)
    }
})
