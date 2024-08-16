const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/",async (req,res)=>{
    const blogs = await Blog.find({}).populate("user")
    res.json(blogs)
})

blogsRouter.get("/:id", async (req,res)=>{   
    const blog = await Blog.findById(req.params.id)
    blog ? res.json(blog) : res.status(404).json({error:"Blog not found"})
})

blogsRouter.delete("/:id",(req,res)=>{
    const result = Blog.findByIdAndDelete(req.params.id);
    result ? res.status(204).end() : res.status(404).json({error : "Blog not found"})
})

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
blogsRouter.post("/", async (req, res) => {
    const body = req.body;
    if (!body.title || !body.authorName) {
        return res.status(400).json({ error: "Content missing" });
    }
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        authorName: body.authorName,
        user: user.id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    return res.status(201).json(savedBlog);
});

blogsRouter.put("/:id",async (req,res) => {
    const updatedBlog = req.body
    const result = await Blog.findByIdAndUpdate(req.params.id,updatedBlog);
    result ? res.json(result) : res.status(404).json({error:"Error not found"});
})

blogsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const result = await Blog.findByIdAndDelete(id);

    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
});

module.exports = blogsRouter