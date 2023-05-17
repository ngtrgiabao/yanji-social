const { ObjectId } = require("mongodb");

class MessageService {
    constructor(client) {
        this.account = client.db().collection("account");
    }

    extractConactData(payload) {
        const message = {
            messages: payload.messages,
            media: payload.media,
            file: payload.file,
            sender: payload.sender,
            receiver: payload.receiver,
            isRead: payload.isRead,
        };

        return message;
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
            console.log("Failed to delete all messages");
        }
    }
}

module.exports = MessageService;
