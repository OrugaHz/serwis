const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res) => {
    // new Quiz({
    //     title: 'Putanie 0',
    //     vote: 0
    // }).save()

    const show = !req.session.vote;


    Quiz.find()
        .then((data) => {
            let sum = 0;
            data.forEach((item) => {
                sum += item.vote;
            })
            // console.log(data);
            res.render('quiz', {
                title: 'Quiz',
                data,
                show,
                sum
            });
        })

});


router.post('/', (req, res) => {

    const id = req.body.quiz;

    Quiz.findOne({
            _id: id
        })
        .then((data) => {
            data.vote = data.vote + 1;
            data.save()
                .then(() => {
                    req.session.vote = 1;
                    res.redirect('/quiz')
                });

        })

});


module.exports = router;