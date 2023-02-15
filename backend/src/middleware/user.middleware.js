const ApiError = require("../api.error");

const appMiddleware = {
    _404: async (req, res, next) => {
        return next(new ApiError(404, "Resource not found"));
    },
    routeMiddleware: async (err, req, res, next) => {
        return res.status(err.statusCode || 500).json({
            msg: err.message || "Interval Server Error",
        });
    },
};

module.exports = appMiddleware;
