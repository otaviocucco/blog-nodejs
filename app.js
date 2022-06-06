require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const adminRoutes = require('./routes/adminRoutes')
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_CONNECTION_URL, (error) => {
    if (!error) {
        console.log('Db connect success');
    } else {
        console.log(error);
    }
});

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
const ejs = require('ejs');
ejs.delimiter = '?';

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', blogRoutes);
app.use('/admin', express.urlencoded({ extended: true }), adminRoutes);

app.get("*", (req, res) => {
    res.status(404);
    res.render('404.ejs');
})

app.listen(process.env.PORT, () => { console.log('Server running on port ' + process.env.PORT); })
