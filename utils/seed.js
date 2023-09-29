const { User, Thought } = require('../models');

//Seeding the Database after connection has been established
function seedDB() {
    Thought.find({})
        .exec()
        //Checks to see if DB has already been created
        .then(async collection => {
            if (collection.length === 0) {
                //Adds Thought Data
                try {
                    const thought1 = await Thought.create({ username: 'javascriptlover23', thoughtText: 'i love javascript!' });
                    const thought2 = await Thought.create({ username: 'mongoosegirl', thoughtText: 'mongooses (mongeese?) are the cutest!!' });
                    //Adds User Data
                    await User
                        .insertMany([
                            { username: 'javascriptlover23', email: 'codingstudent@gmail.com' },
                            { username: 'mongoosegirl', email: 'mongoosegirl@gmail.com' },
                        ]);
                    //Updates User Data to Include Thoughts
                    await User.findOneAndUpdate(
                        { username: 'javascriptlover23' },
                        {
                            $push: { thoughts: thought1._id }
                        },
                        { new: true }
                    );
                    await User.findOneAndUpdate(
                        { username: 'mongoosegirl' },
                        {
                            $push: { thoughts: thought2._id }
                        },
                        { new: true }
                    );
                    console.log('Seeding completed! 🌱')
                } catch (error) {
                    console.log(error);
                }
            }
        });

}

module.exports = { seedDB }