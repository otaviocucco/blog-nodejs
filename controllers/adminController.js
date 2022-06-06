const Post = require("../models/Post");
const Author = require("../models/Author");
const { postValidate } = require('./validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getcookie(req) {
    const { headers: { cookie } } = req;
    if (cookie) {

        let cookieObjects = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});

        return cookieObjects;
    } else {
        cookieObjects = {};

        return cookieObjects;
    }

}

const adminController = {
    login: (req, res) => {

        let tokenCookie = getcookie(req).token;
        console.log(tokenCookie);

        res.render('admin/index.ejs');
    },

    loginPOST: async function (req, res) {

        const selectedAuthor = await Author.findOne({ email: req.body.email });
        if (!selectedAuthor) { return res.status(400).send('Email or password incorrect') };

        const passwordAndAuthorMatch = bcrypt.compareSync(req.body.password, selectedAuthor.password)
        if (!passwordAndAuthorMatch) { return res.status(400).send('Email or password incorrect') };

        const token = jwt.sign({ _id: selectedAuthor._id, email: selectedAuthor.email }, process.env.TOKEN_SECRET, { expiresIn: 60 });


        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        res.send("Author logged")
    },

    posts: async (req, res) => {
        let posts = await Post.find().sort({ createAt: -1 });
        res.render('admin/posts.ejs', { posts });
    },
    new: (req, res) => {
        res.render('admin/new.ejs');
    },
    newPOST: async (req, res) => {

        const { error } = postValidate(req.body)

        if (error) {
            return res.render('admin/new.ejs', { msg: error.message, post: req.body });
        }

        const post = new Post({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            author: req.body.author
        })

        try {
            await post.save();
            res.redirect('posts');

        } catch (error) {
            res.status(400).send(error);
        }



    },
    edit: async (req, res) => {
        let id = req.params.id;
        try {
            let post = await Post.findById(id);
            res.render('admin/edit.ejs', { post });
        } catch (error) {
            res.status(404).send(error);
        }

    },
    editPOST: async (req, res) => {

        const { error } = postValidate(req.body)

        if (error) {
            return res.render('admin/edit.ejs', { msg: error.message, post: req.body });
        }

        let post = {};
        post.image = req.body.image;
        post.title = req.body.title;
        post.description = req.body.description;
        post.author = req.body.author;

        let id = req.params.id;

        try {
            await Post.updateOne({ _id: id }, post);
            res.redirect('../posts');
        } catch (error) {
            res.status(404).send(error);
        }

    },

    authors: async (req, res) => {
        let authors = await Author.find().sort({ createAt: -1 });

        res.render('admin/authors.ejs', { authors });
    },

    newAuthor: async (req, res) => {
        res.render('admin/new-author.ejs');
    },

    newAuthorPOST: async (req, res) => {

        const author = new Author({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })

        try {
            await author.save();
            res.redirect('authors');

        } catch (error) {
            res.status(400).send(error);
        }

    },
    author: async (req, res) => {
        let id = req.params.id;
        try {
            let author = await Author.findById(id);

            res.render('admin/author.ejs', { author });
        } catch (error) {
            res.status(404).send(error);
        }

    },
    authorPOST: async (req, res) => {

        let author = {};
        author.name = req.body.name;
        author.email = req.body.email;
        author.description = req.body.description;

        let id = req.params.id;

        try {
            await Author.updateOne({ _id: id }, author);
            res.redirect('../authors');
        } catch (error) {
            res.status(404).send(error);
        }

    },
}

module.exports = adminController;