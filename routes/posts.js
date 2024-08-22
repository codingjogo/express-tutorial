import express from 'express';
const router = express.Router();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
]

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

// Get all posts
router.get('/', logger, (req, res) => {
    const limit = parseInt(req.query.limit);

    // try this out with ?limit=2 and see changes from your posts
    if (!isNaN(limit) && limit > 0) {
        // we can chain status code and json methods
        return res.status(200).json(posts.slice(0, limit));
    }

    res.json(posts);
})

// Get single posts
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({message: "Post not Found!"})
    } 

    res.status(200).json(post);
})

// Create new post
router.post('/', (req, res) => {
    const newPost = {
        id: posts.length +1,
        title: req.body.title,
    };

    if (!newPost.title) {
        return res.status(400).json({message: "Title must be provided"});
    }

    posts.push(newPost);
    console.log(`Added new posts ID: ${newPost.id} title: ${newPost.title}`)
    res.status(201).json(posts);
});

router.put('/:id', (req, res) => {
    // Remember this could be an API in your Database
    // This is just a reresentation on how it works
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(404).send({message: "ID Not Found!"});
    }

    const post = posts.find(p => p.id === id);

    post.title = req.body.title;
    res.status(200).send(post);
})

router.delete('/:id', (req, res) => {
    // Remember this could be an API in your Database
    // This is just a reresentation on how it works
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(404).send({message: "ID Not Found!"});
    }

    posts = posts.filter(p => p.id !== id);
    res.status(200).send(posts);
})

export default router