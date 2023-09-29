const { Schema, model } = require('mongoose');

//Creates User Schema
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/] },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'users' }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

//Initialises User
const User = model('users', userSchema);

//Virtual to return friend list length
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

//Checks to see if DB is already seeds, and, if not, seeds the db:
User.find({})
    .exec()
    .then(async collection => {
        if (collection.length === 0) {
            try {
                const insertedItems = await User
                    .insertMany([
                        { username: 'javascriptlover23', email: 'codingstudent@gmail.com' },
                        { username: 'mongoosegirl', email: 'mongoosegirl@gmail.com' },
                    ]);
                console.log('Inserted items:', insertedItems);
            } catch (error) {
                console.log(error);
            }
        }
    },
    );


module.exports = User;
