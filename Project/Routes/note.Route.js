const express = require("express")
const noteModel = require("../Model/note.Model")
const noteRouter = express.Router();

noteRouter.post("/create",async(req,res)=>{
    console.log(req.body, req.user)
    const {title,content,status} = req.body;
    const userId = req.user._id
    try{
        const note = new noteModel({
            title:title,
            content:content,
            status:status,
            userId:userId
        })
        await note.save()
        res.status(201).json({"msg":"Note created successfully"})
    }catch(error){
        res.status(500).json({"msg":`Error while creating user,${error.message}`})
    }
})

noteRouter.get("/",async(req,res)=>{
    const userId = req.user._id;
   try{
    const notes = await noteModel.find({userId})
    res.status(200).json({notes})
   }catch(error){
            res.status(500).json({"msg":`Error while fetching notes,${error.message}`})
   }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const noteId = req.params.id;
    const userId = req.user._id;
    try{
        const note = await noteModel.findOne({_id:noteId})
        if(note.userId.toString() === userId.toString()){
            await noteModel.findByIdAndUpdate({_id:noteId},payload)
            return res.status(200).json({"msg":"Note updated successfully"})
        }else{
            return res.status(401).json({"msg":"You are not authorized to update this note"})
        }
    }catch(error){
        res.status(500).json({"msg":`Error while updating note,${error.message}`})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId = req.params.id;
    const userId = req.user._id;
    try{
        const note = await noteModel.findOne({_id:noteId})
        if(note.userId.toString()===userId.toString()){
            await noteModel.findByIdAndDelete({_id:noteId})
            return res.status(401).json({"msg":"Note deleted successfully"})
        }else{
            return res.status(401).json({"msg":"You are not authorized to delete this note"})
        }
    }catch(error){
        res.status(500).json({"msg":`Error while deleting note,${error.message}`})
    }
})

module.exports= noteRouter