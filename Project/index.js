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

server.get("/dashboard",(req,res)=>{
    res.send("Dashboard data")
})

server.get("/product",(req,res)=>{
    res.send("Product data")
})

server.get("/cart",auth,(req,res)=>{
    res.send("cart data....")
})

server.get("/checkout",auth,(req,res)=>{
    console.log("reqbody",req.body)
    res.send("checkout data...")
})

server.get("/update",[auth,checkAdmin],(req,res)=>{
    res.send("update data...")
})

server.get("/delete",[auth,checkAdmin],(req,res)=>{
    res.send("delete data...")
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
