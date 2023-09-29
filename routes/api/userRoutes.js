const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

//creates routes for /api/user
router.route('/').get(getAllUsers).post(createUser);

//creates routes for /api/user/{id}
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

//creates routes for /api/user/friends{userId}/{friendID}
router.route('/friends/:userId/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
