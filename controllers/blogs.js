const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/",async (req,res)=>{
    try{
        const blogs = await Blog.find({})
        res.json(blogs)
    }
    catch(error){
        console.error(error);
    }
})

blogsRouter.get("/:id", async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id)
        blog ? res.json(blog) : res.status(404).json({error:"Blog not found"})
    }
    catch(error){
        console.error(error);
    }
})

blogsRouter.delete("/:id",(req,res)=>{
    try{
        const result = Blog.findByIdAndDelete(req.params.id);
        result ? res.status(204).end() : res.status(404).json({error : "Blog not found"})
    }
    catch(error){
        res.status(500).json({error:"Blog not deleted"})
    }
})

blogsRouter.post("/", async (req, res) => {
    const body = req.body;
    try {
        if (!body.title || !body.authorName) {
            return res.status(400).json({ error: "Content missing" });
        }
        const blog = new Blog({
            title: body.title,
            authorName: body.authorName
        });
        const savedBlog = await blog.save();
        return res.status(201).json(savedBlog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while saving the blog" });
    }
});

blogsRouter.put("/:id",async (req,res) => {
    try{
        const updatedBlog = req.body
        const result = await Blog.findByIdAndUpdate(req.params.id,updatedBlog);
        result ? res.json(result) : res.status(404).json({error:"Error not found"});
    }
    catch(error){
        return res.status(500).json({error:"An error occured while updating the blog"})
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Blog.findByIdAndDelete(id);

    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete blog' });
  }
});

module.exports = blogsRouter