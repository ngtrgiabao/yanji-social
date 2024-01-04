  /**
   * @swagger
   * /post:
   *   get:
   *     description: Returns the homepage
   *     tags: ["Post"]
   *     responses:
   *       200:
   *         description: Hello from post :D
   */
app.get('/', (req, res) => {
  res.send({
      msg: "Hello from post :D",
  });
});