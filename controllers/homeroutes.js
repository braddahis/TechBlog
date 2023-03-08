const router = require("express").Router()
const { User, Post, Comment } = require("../models")
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User]
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, logged_in: req.session.logged_in })
  } catch (error) {
    res.json(error)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

router.get("/profile", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {userId: req.session.user_id},
      include: [User]
    })
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("profile", { posts, logged_in: req.session.logged_in })
  } catch (error) {
    res.json(error)
  }
})


module.exports = router