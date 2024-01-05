const UserMiddleware = require("../../middleware/user.middleware");

const UserController = require("../../controllers/user.controller");

/**
 * @swagger
 * /user:
 *   get:
 *     tags: ["User"]
 *     responses:
 *       200:
 *         description: Hello from user :D
 */
app.get("/", (req, res) => {
  res.send({ msg: "Hello from user :D" });
});

/**
 * @swagger
 * /user/all-users:
 *   get:
 *     description: Get all users
 *     tags: ["User"]
 *     parameters:
 *       - name: username
 *         in: query
 *         description: Username to filter users
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users
 */

app.get("/user/:userID", UserController.getAllUsers);

/**
 * @swagger
 * /user/{userID}:
 *   get:
 *     description: Get a specific user by ID
 *     tags: ["User"]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the user
 */
app.get("/user/:userID", UserController.getUserByID);

/**
 * @swagger
 * /user/{userID}/shared:
 *   get:
 *     description: Get posts shared by the user
 *     tags: ["User"]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts shared by the user
 */
app.get(
  "/user/:userID/shared",
  UserMiddleware.validateUserById,
  UserController.getPostsShared,
);

/**
 * @swagger
 * /user/{userID}/saved:
 *   get:
 *     description: Get posts saved by the user
 *     tags: ["User"]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts saved by the user
 */
app.get(
  "/user/:userID/saved",
  UserMiddleware.validateUserById,
  UserController.getPostsSaved,
);

/**
 * @swagger
 * /user/{userID}/quantity/image:
 *   get:
 *     description: Get quantity of images uploaded by the user
 *     tags: ["User"]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantity of images uploaded by the user
 */
app.get(
  "/user/:userID/quantity/image",
  UserMiddleware.validateUserById,
  UserController.fetchUserSpecificImageQuantity,
);

/**
 * @swagger
 * /user/{userID}/quantity/audio:
 *   get:
 *     description: Get quantity of audios uploaded by the user
 *     tags: ["User"]
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quantity of audios uploaded by the user
 */
app.get(
  "/user/:userID/quantity/audio",
  UserMiddleware.validateUserById,
  UserController.fetchUserSpecificAudioQuantity,
);

/**
 * @swagger
 * /user/register:
 *   post:
 *     description: Register a new user
 *     tags: ["User"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                type: string
 *               password:
 *                type: string
 *               email:
 *                type: string
 *     responses:
 *       200:
 *         description: Registered user
 */
app.post(
  "/user/register",
  UserMiddleware.validateUserById,
  UserController.register,
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     description: Login a user
 *     tags: ["User"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                type: string
 *               password:
 *                type: string
 *     responses:
 *       200:
 *         description: Logged in user
 */
app.post("/user/login", UserMiddleware.validateUserById, UserController.login);
