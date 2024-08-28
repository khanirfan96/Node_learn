const express = require('express');
const path = require('path');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const { handleconnectDB } = require('./db/db');

const URL = require('./models/url');

const app = express();
const port = 8001;

handleconnectDB().then(() => console.log('MongoDB Connected'));


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/url', restricToLoggedinUserOnly, urlRoute);
// app.use('/user', userRoute);
// app.use('/', checkAuth, staticRoute);
app.use('/', function (req, res, next) {
    next()
}, require('./routes/index'))

app.get('/:shortId', async (req, res) => {
    const shortID = req.params.shortId;

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: shortID },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            },
            { new: true }
        );

        if (entry && entry.redirectURL) {
            return res.redirect(entry.redirectURL);
        } else {
            return res.status(404).json({ error: "URL not found" });
        }
    } catch (err) {
        console.error("Error fetching entry:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => console.log(`Server Started at PORT:${port}`));
