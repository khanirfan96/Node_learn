const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics} = require('../../controllers/url')
const {restricToLoggedinUserOnly} = require('../../middleware/auth')
const router = express.Router();

router.post("/",restricToLoggedinUserOnly, handleGenerateNewShortURL );
router.get("/getanalytics/:shortId",restricToLoggedinUserOnly, handleGetAnalytics);

module.exports = router;