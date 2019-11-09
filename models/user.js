const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    saltRounds = 10;

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    bootcamp: { type: String, required: false },
    rating: { type: Number, required: false },
    review: String,
    favoriteVideos: { type: Array, required: false },
    favoriteArticles: { type: Array, required: false },

    savedJobs: { type: Array, required: false },
    favoriteResumes: { type: Array, required: false }
    favoriteResumes: { type: Array, required: false },
    savedJobs: { type: Array, required: false }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;