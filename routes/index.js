var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Postlist page. */
router.get('/postlist', function(req, res) {
  var db = req.db;
  var posts = db.get('posts');
  posts.find({}, {}, function(e, docs) {
    res.render('postlist', {
      "postlist": docs
    });
  });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var users = db.get('users');
  users.find({}, {}, function(e, docs) {
    res.render('userlist', {
      "userlist": docs
    });
  });
});

/* Get New post page */
router.get('/newpost', function(req, res) {
  res.render('newpost', { title: 'Add New Post'});
});

/* Get new user page */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: "Add new user"});
})

router.get('/login', function(req, res) {
  res.render('login', { title: "Login" });
})

/* POST to add post service */
router.post('/addpost', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the name attributes
  var postTitle = req.body.posttitle;
  var postBody = req.body.postbody;
  var postDate = new Date();

  // Set our collection
  var posts = db.get('posts');

  // Submit to the DB
  posts.insert({
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
  });
});

/* POST to add user service */
router.post('/adduser', function(req, res) {
  var db = req.db;

  var username = req.body.username;
  var email = req.body.email;

  var users = db.get('users');

  users.insert({
    "username": username,
    "email": email
  }, function(err, doc) {
    if (err) {
      res.send("There was a porblem adding the user information to the database");
    }
    else {
      res.redirect("userlist");
    }
  })
})



module.exports = router;
