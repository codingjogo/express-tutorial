import express from 'express';
const router = express.Router();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
]

// Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);

    // try this out with ?limit=2 and see changes from your posts
    if (!isNaN(limit) && limit > 0) {
        // we can chain status code and json methods
        return res.status(200).json(posts.slice(0, limit));
    }

    res.json(posts);
})

// Get single posts
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        const error = new Error(`A post with id ${id} was not found`);
        error.status = 404; // not found
        return next(error);
    } 

    res.status(200).json(post);
})

// Create new post
router.post('/', (req, res, next) => {
    const newPost = {
        id: posts.length +1,
        title: req.body.title,
    };

    if (!newPost.title) {
        const error = new Error("Title must be provided");

        error.status = 400; // bad request
        return next(error);
    }

    posts.push(newPost);
    console.log(`Added new posts ID: ${newPost.id} title: ${newPost.title}`)
    res.status(201).json(posts);
});

router.put('/:id', (req, res, next) => {
    // Remember this could be an API in your Database
    // This is just a reresentation on how it works
    const id = parseInt(req.params.id);
    if (!id) {
        const error = new Error('ID Not Found!')
        error.status = 404;
        return next(error);
    }

    const post = posts.find(p => p.id === id);

    post.title = req.body.title;
    res.status(200).send(post);
})

router.delete('/:id', (req, res, next) => {
    // Remember this could be an API in your Database
    // This is just a reresentation on how it works
    const id = parseInt(req.params.id);
    if (!id) {
        const error = new Error('ID Not Found!')
        error.status = 404;
        return next(error);
    }

    posts = posts.filter(p => p.id !== id);
    res.status(200).send(posts);
})

export default router