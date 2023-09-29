const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find().populate({ path: 'reactions', select: '-__v' })
            res.json(thought);
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }).populate({ path: 'reactions', select: '-__v' });
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                {
                    $addToSet: { thoughts: thought._id }
                },
                { new: true }
            );
            res.json(thought);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    thoughtText: req.body.thoughtText,
                },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json(thought);
            console.log(`Deleted: ${thought}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } },
                },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { reactions: { _id: req.params.reactionId } },
                },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}

