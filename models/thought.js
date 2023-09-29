const { Schema, model } = require('mongoose');
const User = require('./user.js');

//Creates Reaction Schema
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

//Creates Thought schema
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

//Initialises Thought
const Thought = model('thoughts', thoughtSchema);

//Virtual to view reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Checks to see if DB is already seeded, and, if not, seeds it
Thought.find({})
    .exec()
    .then(async collection => {
        if (collection.length === 0) {
            try {
                const insertedItems = await Thought
                    .insertMany([
                        { username: 'javascriptlover23', thoughtText: 'i love javascript!' },
                        { username: 'mongoosegirl', thoughtText: 'mongooses (mongeese?) are the cutest!!' },
                    ]);
                console.log('Inserted items:', insertedItems);
            } catch (error) {
                console.log(error);
            }
        }
    });

module.exports = Thought;
