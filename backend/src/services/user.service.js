const { ObjectId } = require("mongodb");

class UserService {
    /*
    1. We’re creating a constructor function that takes in a client parameter.
    2. We’re creating a property called account that is equal to the client.db().collection(“account”) method.
    */
    constructor(client) {
        this.account = client.db().collection("account");
    }

    /**
     * It takes a payload object, and returns a user object.
     * @param payload - the data that is sent to the server
     * @returns The user object is being returned.
     */
    extractConactData(payload) {
        const user = {
            username: payload.usernamem,
            password: payload.password,
            email: payload.email,
        };

        return user;
    }

    /*
    1. Extracting the contact data from the payload
    2. Using the findOneAndUpdate() method to update the contact data
    3. Returning the updated contact data
    */
    async create(payload) {
        const account = this.extractConactData(payload);
        const result = await this.account.findOneAndUpdate(account, {
            returnDocument: "after",
            upsert: true,
        });

        return result.value;
    }

    /*
    1. The find() method is called on the account collection.
    2. The find() method returns a cursor object.
    3. The toArray() method is called on the cursor object.
    4. The toArray() method returns an array of documents.
    */
    async find(filter) {
        const cursor = await this.account.find(filter);
        return await cursor.toArray();
    }

    /*
    1. The findByName() method takes a name as a parameter.
    2. The find() method is used to find all the documents in the collection.
    3. The  operator is used to search for a string in a column.
    4. The  operator is used to make the search case-insensitive.
    5. The findByName() method returns the documents that match the name parameter.
    */
    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name),
                $options: "i",
            },
        });
    }

    /*
    1. It’s checking if the id is valid.
    2. If it is, it’s creating a new ObjectId.
    3. If it’s not, it’s returning null.
    */
    async findById(id) {
        return await this.account.findOne({
            _id: ObjectId.isValie(id) ? new ObjectId(id) : null,
        });
    }

    /*
    1. We’re creating a filter object that contains the _id of the document we want to update.
    2. We’re creating an update object that contains the fields we want to update.
    3. We’re calling the findOneAndUpdate() method on the collection object.
    4. We’re returning the updated document.
    */
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

    /*
    1. It’s checking if the id is valid.
    2. If it is, it’s converting it to an ObjectId.
    3. If it’s not, it’s setting it to null.
    4. It’s then finding the document and updating it.
    5. It’s returning the value of the document.
    */
    async delete(id) {
        const result = await this.account.findOneAndUpdate({
            _id: ObjectId.isValie(id) ? new ObjectId(id) : null,
        });

        return result.value;
    }

    /*
    1. The findOneAndUpdate() method is used to find a document and update it in a single atomic operation.
    2. The first parameter of the findOneAndUpdate() method is a query object.
    3. The second parameter is an object containing the fields to update.
    4. The third parameter is an object that contains the options for the update operation.
    5. The new option is set to true to return the updated document.
    6. The multi option is set to true to update all documents that match the query.
    7. The deletedCount property of the result object contains the number of documents deleted.
    */
    async deleteAll() {
        const result = await this.account.findOneAndUpdate({});
        return result.deletedCount;
    }
}

module.exports = UserService;
