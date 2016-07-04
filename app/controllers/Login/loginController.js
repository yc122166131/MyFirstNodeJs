var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/login', router);
};

router.get('/signUp', function (req, res, next) {
    res.render('userLogin/login');
});



