const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    email:{
		type: String,
		unique: true,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	role:{
		type: String,
		deafult: "customer",
		enum: ["seller","buyer"]
	}
},{
    timestamps:true,
    versionKey:false
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel