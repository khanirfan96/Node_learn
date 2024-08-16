const express = require('express');

const urlRoute = require("./routes/url");

const app = express();
const port = 8001;

app.use('/url', urlRoute);

app.listen(port, ()=> console.log(`Server Started at PORT:${port}`));