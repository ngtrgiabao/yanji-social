const ApiError = require("../../api.error");
const UserService = require("../services/user.service");
const Mongodb = require("../utils/mongodb.utils");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can't be empty"));
    }

    try {
        /* Creating a new instance of the userService class and then calling the create method on it. */
        const userService = new UserService(Mongodb.client);
        const document = await userService;
        return res.send(document);
    } catch (error) {
        console.log(error);

        return next(new ApiError(500, "An error occured while createing user"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        /*
        1. We’re creating a new instance of the UserService class.
        2. We’re destructuring the name property from the req.query object.
        3. We’re calling the getUserByName method on the userService instance.
        4. We’re passing the name variable as an argument to the getUserByName method.
        5. We’re returning the result of the getUserByName method.
        */
        const userService = new UserService(Mongodb.client);
        const { name } = req.query;

        /*
        1. If the name query parameter is present, then it will call the findByName() method of the userService.
        2. If the name query parameter is not present, then it will call the find() method of the userService.
        */
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occured while find users"));
    }

    console.log(documents);

    /* returns the documents in the collection. */
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(Mongodb.client);
        const document = await userService.findById(req.params.id);

        if (!document) {
            return next(new ApiError(404, "user not found"));
        }

        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving user with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    /* Checking if the request body is empty. */
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(404, "Data to update cannot be empty"));
    }

    try {
        const userService = new UserService(Mongodb.client);
        const document = await userService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "user not foune"));
        }

        return res.send({
            msg: "user was updated success",
        });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(Mongodb.client);
        const document = await userService.delete(req.params.id);

        if (!document) {
            return next(new ApiError(404, "user not found"));
        }

        return res.send({ msg: "user was delete successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete user with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const userService = new UserService(Mongodb.client);
        const deleteCount = await userService.deleteAll();

        return res.send({
            msg: `${deleteCount} users was deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, `An error occurred while removing all users`)
        );
    }
};
