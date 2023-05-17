const { ObjectId } = require("mongodb");

class RoomService {
    constructor(client) {
        this.account = client.db().collection("account");
    }

    extractConactData(payload) {
        const room = {
            name: payload.name,
            participants: payload.participants,
            messages: payload.messages,
            settings: payload.settings,
            isAdmin: payload.isAdmin,
        };

        return room;
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
        const result = await this.account.deleteOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.deletedCount;
    }

    async deleteAll() {
        try {
            const result = await this.account.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            console.log("Failed to delete all rooms");
        }
    }
}

module.exports = RoomService;
