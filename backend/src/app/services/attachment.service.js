const { ObjectId } = require("mongodb");

class AttachmentService {
    constructor(client) {
        this.account = client.db().collection("account");
    }

    extractConactData(payload) {
        const user = {
            messageId: payload.messageId,
            chatRoomId: payload.chatRoomId,
            userId: payload.userId,
            fileName: payload.fileName,
            fileType: payload.fileType,
            fileSize: payload.fileSize,
            filePath: payload.filePath,
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
        const REGEX_ID = /^[0-9a-fA-F]{24}$/;

        if (typeof id !== "string" || id.length > 24 || !REGEX_ID.test(id)) {
            // Invalid ID format
            return null;
        }

        return await this.account.findOne({
            _id: ObjectId.isValid(id) ? id : null,
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
        const result = await this.account.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });

        return result.value;
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

module.exports = AttachmentService;
