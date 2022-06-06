const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/", adminController.login);
router.post("/", adminController.loginPOST);

router.get("/posts", adminController.posts);

router.get("/new", adminController.new);
router.post("/new", adminController.newPOST);

router.get("/edit/:id", adminController.edit);
router.post("/edit/:id", adminController.editPOST);

router.get("/authors", adminController.authors);

router.get("/new-author", adminController.newAuthor);
router.post("/new-author", adminController.newAuthorPOST);

router.get("/author/:id", adminController.author);
router.post("/author/:id", adminController.authorPOST);


module.exports = router;