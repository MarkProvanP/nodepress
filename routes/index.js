var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Postlist page. */
router.get('/postlist', function(req, res) {
  var db = req.db;
  var collection = db.get('postcollection');
  collection.find({}, {}, function(e, docs) {
    res.render('postlist', {
      "postlist": docs
    });
  });
});

/* Get New post page */
router.get('/newpost', function(req, res) {
  res.render('newpost', { title: 'Add New Post'});
});

/* POST to add post service */
router.post('/addpost', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the name attributes
  var postTitle = req.body.posttitle;
  var postBody = req.body.postbody;
  var postDate = new Date();

  // Set our collection
  var collection = db.get('postcollection');

  // Submit to the DB
  collection.insert({
    "title": postTitle,
    "body": postBody,
    "date": postDate
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database");
    }
    else {
      // And forward to success page
      res.redirect("postlist");
    }
  })
})

module.exports = router;
