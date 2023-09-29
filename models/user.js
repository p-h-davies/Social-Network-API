const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/] },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

const User = model('user', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

User
    .create({
        username: 'javascriptlover23',
        email: 'codingstudent@gmail.com'
    })
    .then(result => console.log('Created new document', result))
    .catch(err => console.log(err));


module.exports = User;
