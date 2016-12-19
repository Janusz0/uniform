var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
	belongsTo: { type: Schema.Types.ObjectId, ref:'User'},
	facebook: String,
	twitter: String
});

module.exports = mongoose.model('Profile', ProfileSchema);