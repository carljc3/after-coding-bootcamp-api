const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    saltRounds = 10;

const UserSchema = new Schema({
    username: { type: String, required: true, index: {unique: true}},
    password: { type: String, required: true },
    bootcamp: { type: String, required: false },
    rating: { integer: Variable, required: false },
    review: String, 
});

UserSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;