const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../controllers/url')

const router = express.Router();

router.post("/", handleGenerateNewShortURL );
router.get("/getanalytics/:shortId", handleGetAnalytics);

module.exports = router;