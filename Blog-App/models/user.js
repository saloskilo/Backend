const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const {createTokenForUser}=require('../utils/authentication')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/assets/userAvatar.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

}, { timestamps: true });

// encryt password before go to db
userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified) {
        return
    }

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next()

})

// check password if match 
userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvideHash) {
        throw new Error("Password is Incorrect");
    }

    const token=createTokenForUser(user)
    return token
})

const USER = new mongoose.model('user', userSchema);


module.exports = USER;