import express from 'express';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';

const port = process.env.PORT || 8080;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger Middleware
app.use(logger)

// Routes
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})