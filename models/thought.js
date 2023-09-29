const { Schema, model } = require('mongoose');
const moment = require('moment');

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
        createdAt: {
            type: Date, default: Date.now,
            get: (date) => moment(date).format('MMM Do, YYYY [at] hh:mm a')

        }
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
        createdAt: {
            type: Date, default: Date.now,
            get: (date) => moment(date).format('MMM Do, YYYY [at] hh:mm a')

        },
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
const Thought = model('Thought', thoughtSchema);

//Virtual to view reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;
