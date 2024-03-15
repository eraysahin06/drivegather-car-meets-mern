const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    email: String,
    photoURL: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
