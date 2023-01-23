import express from 'express';
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, getByUserId, updateBlog } from '../controllers/blog-controller';

const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getBlogById);
blogRouter.delete("/:id",deleteBlogById);
blogRouter.get("/user/:id",getByUserId);
export default blogRouter;