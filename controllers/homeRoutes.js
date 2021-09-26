const router = require('express').Router();
const session = require('express-session');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// display all posts

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view a post

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment
        }
      ],
    });
    const post = postData.get({ plain: true });
    if(req.session.user_id === post.user.id) {
      res.render('mypost', {
        post,
        logged_in: req.session.logged_in
      });
    } else {
      res.render('post', {
        post,
        logged_in: req.session.logged_in
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// view dashboard

router.get('/dashboard', async (req, res) => {
  if(req.session.logged_in) {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            where: {
              id: req.session.user_id
            }
          },
        ],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('dashboard', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }else {
    res.render('login');
  }

});

// view login page

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
