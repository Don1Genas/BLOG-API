const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const BlogModel = require('../model/blogSchema')

//Create a Router
const router = express.Router()

//GET BLOGS
router.get('/', authMiddleware, async (req, res) => {
    try {
        const blogs = await BlogModel.find()
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
    }

})

//CREATE BLOGS
router.post('/', authMiddleware, async (req, res) => {
    const blogData = req.body // gets the data from the request
    console.log(blogData);
    try {
        const blog = await BlogModel.create(blogData) // Created the blog in the DB
        //send back a response
        res.status(201).json(blog)
        
    } catch (error) {
        res.status(400).json('Bad request!!')
    }
})

// GET BLOG BY ID
router.get('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const blog = await BlogModel.findById(id)
        res.status(200).json(blog)
    } catch (error) {
        console.log(error);
        res.status(400).json('ID is not found!')
    }
})

// UPDATE BLOG BY ID
router.put('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const newBlogData = req.body

    try {
        //Finds the blog by the ID
        const blog = await BlogModel.findByIdAndUpdate(id, newBlogData, {new: true})
        res.status(202).json(blog)
    } catch (error) {
        console.log(error);
    }
})

// DELETE A BLOG BY ID
router.delete('/:id', authMiddleware, async (req, res) => {
    const id = req.params.id

    try {
        const blog = await BlogModel.findByIdAndDelete(id)
        res.status(200).json('Blog was deleted!')
    } catch (error) {
        console.log(error);
    }
})

module.exports = router