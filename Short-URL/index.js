const express = require('express');
const path = require('path');
const { handleconnectDB } = require('./config');
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const staticRoute = require('./routes/staticrouter'); 

const app = express();
const port = 8001;

handleconnectDB('mongodb+srv://irfankik141:Ed0jG3I8S2nw8Nlc@cluster0.wj6xtgc.mongodb.net/short-url')
    .then(() => console.log('MongoDB Connected'));


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/url', urlRoute);
app.use('/static', staticRoute);

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
