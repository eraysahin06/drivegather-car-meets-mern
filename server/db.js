const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB connected successfully.');

        const db = mongoose.connection;

        db.once('open', () => {
            console.log('Connected to MongoDB');

            // Set up a change stream to listen for updates to the username field in the User collection
            const userChangeStream = User.watch([
                {
                    $match: {
                        'updateDescription.updatedFields.username': { $exists: true }
                    }
                }
            ]);

            userChangeStream.on('change', async (change) => {
                const updatedUserId = change.documentKey._id;
                const updatedUsername = change.updateDescription.updatedFields.username;

                // Update the creatorUsername field in the Community collection
                await Community.updateMany(
                    { creatorId: updatedUserId },
                    { $set: { creatorUsername: updatedUsername } }
                );

                console.log(`Updated username for user ${updatedUserId} to ${updatedUsername}`);
            });
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};


module.exports = connectDB;