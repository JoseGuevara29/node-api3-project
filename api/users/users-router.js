const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const mw = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post("/", mw.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const changes = req.body;
  const { id } = req.params;
  Users.update(id, changes)
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", mw.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "User has been deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id/posts", mw.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post(
  "/:id/posts",
  mw.validateUserId,
  mw.validatePost,
  async (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const newPost = await Posts.insert({
      user_id: req.params.id,
      text: req.body.text,
    });
    res.status(201).json(newPost);
  }
);

// do not forget to export the router
module.exports = router;
