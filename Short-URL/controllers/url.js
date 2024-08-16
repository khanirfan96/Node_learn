const shortid = require('shortid');
const URL= require('../models/url');

async function handleGenerateNewShortURL (req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'URL id required'})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({
        id: shortID
    })
}

async function handleGetAnalytics (req, res) {
    const shortID = req.params.shortId;
    const result = await URL.findOne({shortId: shortID});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}