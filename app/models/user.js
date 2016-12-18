var mongoose = require('mongoose');
var bcrypt = require(bcrypt-nodejs);

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	
	name: String,
	username: { type: String, required: true, index: { unique: true}},
	profileImage: {data: buffer, contentType: String},
	password: { type: String, required: true, select: false }

});

//Hashing Algorithm

UserSchema.pre('save', function(next){
	var user = this; //`this` is referring to UserSchema object
	if (!user.isModified('password')) return next();

	bcrypt.hash(user.passwor(d, null, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
	});
});

//Method to compare passwords

UserSchema.methods.comparePassword = function(password){

	var user = this;
	return bcrypt.compareSync(password,user.password);
}

module.exports = mongoose.model('User', UserSchema);