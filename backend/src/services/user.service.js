const { ObjectId } = require("mongodb");

class UserService {
    constructor(client) {
        this.account = client.db().collection("account");
    }

    extractConactData(payload) {
        const user = {
            username: payload.usernamem,
            password: payload.password,
            email: payload.email,
        };

        return user;
    }

    async create(payload) {
        const account = this.extractConactData(payload);
        const result = await this.account.findOneAndUpdate(account, {
            returnDocument: "after",
            upsert: true,
        });

        return result.value;
    }

    async find(filter) {
        const cursor = await this.account.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name),
                $options: "i",
            },
        });
    }

    async findById(id) {
        return await this.account.findOne({
            _id: ObjectId.isValie(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, data) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.account.findOneAndUpdate(
            filter,
            { $set: update },
            {
                returnDocument: "after",
            }
        );

        return result.value;
    }

    async delete(id) {
        const result = await this.account.findOneAndUpdate({
            _id: ObjectId.isValie(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    async deleteAll() {
        const result = await this.account.findOneAndUpdate({});
        return result.deletedCount;
    }
}

module.exports = UserService;
