const { User, Thought } = require('../models');
const { ObjectId } = require('mongodb');

module.exports = {
    //Get all users route functionality
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' });
            res.json(users);
        } catch (err) {
            console.error({ message: err });
            return res.status(500).json(err);
        }
    },
    //Get user by ID route functionality
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate({ path: 'thoughts', select: '-__v' }).populate({ path: 'friends', select: '-__v' });
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Create User route functionality
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Update user route functionality
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    username: req.body.username,
                    email: req.body.email,
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete user route functionality
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.userId });
            res.status(200).json(user);
            console.log(`Deleted: ${user}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ error: 'Something went wrong' });
        }
    },

    //Add friend route functionality
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $addToSet: { friends: req.params.friendId },
                },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete friend route functionality
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {
                    $pull: { friends: req.params.friendId },
                },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}