// mongoose schema

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
    blogId : String,
    title : String,
    authorName : String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

blogSchema.set("toJSON",{
    transform : (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog