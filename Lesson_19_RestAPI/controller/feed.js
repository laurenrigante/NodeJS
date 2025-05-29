exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { title: "first post", content: "this is the conent of the first post" },
    ],
  });
};
exports.postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  //create post in db
  res.status(201).json({
    //201 tells the client success a resource was created
    message: "Post created successfully",
    post: { id: new Date().toISOString, title: title, content: content },
  });
};
