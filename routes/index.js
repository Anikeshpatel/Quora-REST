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

module.exports = router;
