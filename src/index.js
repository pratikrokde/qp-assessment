require('dotenv').config()
const express  = require('express');
const routes = require('./routes/routes')
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(routes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})