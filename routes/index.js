var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  // res.render('index', { title: 'Express' });
    console.log('Its working');
    res.json({
        name: 'Anikesh Patel',
        email: 'anikeshpatel4@gmail.com',
        passwd: '***********',
        skills: [
            'Java',
            'Python',
            'JavaScript'
        ]
    });
});

router.post('/', (req, res) => {
    return res.json({
        id: Math.floor(Math.random() * 10000 + 1),
        name: req.body.name,
        email: req.body.email,
        token: "we83w4r39r93uw3jrow3jw3jwrfw0ifwi0weprfw3-0rfw"
    });
});

module.exports = router;
