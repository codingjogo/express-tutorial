const express = require('express');
const posts = require('./routes/posts');

const port = process.env.PORT || 8080;
const app = express();

// Routes
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})