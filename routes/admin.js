const express = require('express');
const News = require('../models/news');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return
    };
    next();
});

/* GET home page. */
router.get('/', (req, res) => {
    News.find()
        .then((data) => {
            res.render('admin/index', {
                title: 'Admin',
                data
            });
            console.log(data);
        })
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', {
        title: 'Dodaj news',
        body: {},
        errors: {}
    });
});

router.post('/news/add', (req, res) => {
    const body = req.body;

    const newsData = new News(body);
    const errors = newsData.validateSync();


    newsData.save()
        .then(() => {
            res.redirect('/admin')
        })
        .catch(function (err) {
            res.render('admin/news-form', {
                title: 'Dodaj news',
                errors,
                body
            });
        });
});

router.get('/news/remove/:id', (req, res) => {
    News.pre(findOneAndDelete(req.params.id), function () {
        res.redirect('/admin')
    })
    // .then(() => {
    //     res.redirect('/admin')
    // })
});

module.exports = router;