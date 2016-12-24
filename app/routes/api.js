var User = require('../models/user');
var Profile = require('../models/profile');
var jwt = require('jsonwebtoken');

/*var config = ('../../config');
var secretKey = config.secretKey;*/




module.exports = function(app, express){

	var api = express.Router();

	function createToken(user){
		var token = jwt.sign({
			id: user._id,
			name: user.name,
			username: user.username
		}, app.get('superSecret'), {
			expiresIn: 60*60*24
		});	

		return token;
	}

	//Signup API
	api.post('/signup', function(req, res){

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		});

		var token = createToken(user);

		user.save(function(err){
			if (err){
				res.send(err);
				return;
			}

			res.json({
				success: true,
				message: "User has been created!",
				token: token
			});
		});
	});

	//Get all users
	api.get('/users', function(req, res){
		User.find({}, function(err, users){
			if (err){
				res.send(err);
				return;
			}

			res.json(users);
		});
	});

	//Login API
	api.post('/login', function(req, res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err, user){
			if (err) throw err;

			if (!user){
				res.send({ message: "User doesn't exist"});
			}
			else if(user){
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword){
					res.send({ message: "Invalid Password"});
				}
				else{
					/////token

					var token = createToken(user);

					res.json({
						success: true,
						message: "Successfully login!",
						token: token
					});
				}
			}
		});
	});

//Middlewares

api.use(function(req, res, next){
	console.log("Sombody just came to our app");

	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	//check if token exists
	if (token){
		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if(err){
				res.status(403).send({ success: false, message: "Failed to authenticate user"});
			}
			else{
				req.decoded = decoded;
				next();
			}
		});
	}
	else{
		res.status(403).send({ success: false, message: "No token provided"});
	}
});


//Destination B

	//To test if our middleware is working properly

	/*api.get('/', function(req, res){
		res.json("Hello Worldly world!!!!");
	});*/

	api.put('/', function(req, res, next){
		Profile.findOneAndUpdate(req.decoded.id, {
				facebook: req.body.facebook,
				twitter: req.body.twitter
			}, function(err, links){
			if (err)
				return next(err);
			User: res.json(links);
		});
	});

	api.get('/me', function(req, res){
		res.json(req.decoded);
	});

	return api
}

