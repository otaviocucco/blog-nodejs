const Post = require("../models/Post");
const Author = require("../models/Author");


const blogController = {
    index: async (req, res) => {
        let posts = await Post.find().sort({ createAt: -1 });
        res.render('index.ejs', { posts });
    },
    post: async (req, res) => {
        let id = req.params.id;

        let post = await Post.findOneAndUpdate({ _id: id }, { $inc: { click: 1 } });

        res.render('post.ejs', { post });
    },
    about: (req, res) => {
        res.render('about.ejs');
    },
    authors: async (req, res) => {
        let authors = await Author.find().sort({ createAt: -1 });

        res.render('authors.ejs', { authors });
    }
}

module.exports = blogController;