const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: { type: Date, default: Date.now }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
        createdAt: { type: Date, default: Date.now },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const Thought = model('thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

Thought
    .create({
        thoughtText: 'I love coding!',
        username: 'javascriptlover23',
    })
    .then(result => console.log('Created new document', result))
    .catch(err => console.log(err));


module.exports = Thought;
