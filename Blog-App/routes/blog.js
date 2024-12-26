const express = require('express');
const Blog = require('../models/blog');
const path = require('path');
const multer = require('multer');
const router = express.Router();


// Create storage for multer to store files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },

    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});
const upload = multer({ storage: storage });

// get the addBlog page
router.get('/add-new', (req, res) => {
    res.render('addBlog');
});


// add new blog post to the database and redirect to the addBlog page with a success message 
router.post('/', upload.single('coverImageURL'), async (req, res) => {

    const { title, body } = req.body;

    const blog = await Blog.create({
        title: title,
        body: body,
        coverImageURL: `/uploads/${req.file.filename}`,
        createdBy: req.user._id,
    });
    return res.render(`addBlog`);
});

module.exports = router;