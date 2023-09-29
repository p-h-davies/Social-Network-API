const { User, Thought } = require('../models');
const { ObjectId } = require('mongodb');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' });
            res.json(users);
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' });
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id });
            user.username = req.body.username;
            user.email = req.body.email
            user.save()
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        const id = new ObjectId(req.params.id);
        console.log(id)
        try {
            console.log(id)
            const user = await User.findByIdAndDelete({ _id: id });
            res.status(200).json(user);
            console.log(`Deleted: ${user}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
}
