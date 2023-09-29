const router = require('express').Router();
//Import router functionalities
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

//creates routes for /api/thought
router.route('/').get(getAllThoughts).post(createThought);

//creates routes for /api/thought/{id}
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought).post(createReaction);

router.route('/:id/:reactionId').delete(deleteReaction)

module.exports = router;


