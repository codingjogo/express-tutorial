const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
]

// Get all posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);

    // try this out with ?limit=2 and see changes from your posts
    if (!isNaN(limit) && limit > 0) {
        // we can chain status code and json methods
        return res.status(200).json(posts.slice(0, limit));
    }

    res.json(posts);
})

// Get single posts
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({message: "Post not Found!"})
    } 

    res.status(200).json(post);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})