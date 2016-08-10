/*var database = require('../Database/datamodel.js');

module.exports.registerUser = function(req, res){
	var userdetails = new database(req.body);
	console.log('userDetails' , userdetails);
	
	userdetails.save(function(err, result){
		findsomething(userdetails.username, userdetails.password);
		if(err){
			console.log('There seems to be some issue with the server calls');
		}
		res.json(result);
		console.log('Result',result);
	});

}











*/