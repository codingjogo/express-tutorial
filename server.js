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
    res.json(posts);
})

// Get single posts
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        res.status = 404;
        return res.json({message: "Post not Found!"})
    } 

    res.status = 200;
    res.json(post);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})