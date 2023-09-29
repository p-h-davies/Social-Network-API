const { Schema, model } = require('mongoose');

//Creates User Schema
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/] },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

//Initialises User
const User = model('User', userSchema);

//Virtual to return friend list length
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

module.exports = User;