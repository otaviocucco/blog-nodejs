const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get("/", blogController.index)
router.get("/post/:id", blogController.post)
router.get("/about", blogController.about)
router.get("/authors", blogController.authors)

module.exports = router;