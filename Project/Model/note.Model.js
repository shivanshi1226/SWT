const mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    content: {
        type:String,
        required:true
    },
    status: {
        type: Boolean,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  //this reference we're giving from the userModal , the collection that we made there,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})

const noteModel = mongoose.model('Note',noteSchema)

module.exports = noteModel