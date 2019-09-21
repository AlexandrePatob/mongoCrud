const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		require: true,
		unique: true,
		lowercase: true
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
