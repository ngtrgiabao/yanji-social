const app = require("./app");
const config = require("./src/config/index");
const MongoDB = require("./src/utils/mongodb.utils");

const startServer = async () => {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to db :D");

        const PORT = config.app.port;

        app.listen(PORT, () => {
            console.log(`server run success at localhost://${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to db :<");
        process.exit();
    }
};

startServer();
