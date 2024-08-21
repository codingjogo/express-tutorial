const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// setup static folder
// [for more information about statis web server](https://www.scaler.com/topics/expressjs-tutorial/express-static/)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})