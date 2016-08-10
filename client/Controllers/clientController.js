var app = angular.module("newapp",['ngRoute','ngResource']);

app.config(function($routeProvider){
	
	$routeProvider
	.when('/Home',{
		templateUrl : '/views/home.html'
	})
	.when('/Login',
	{
		templateUrl : "/views/LoginPage.html",
		controller  : "loginuser"
	})
	.when('/Signup',
	{
		templateUrl : '/views/SignUpPage.html',
		controller  : 'signupUser'
	})
	.otherwise({
        redirectTo: "/"
    });

});

app.controller('loginuser', ['$scope', '$resource', '$window', function($scope, $resource, $window) {
	$scope.signIn = function(){
		var logUser = $resource('/api/login');

		logusers = new logUser();
		logusers.username = $scope.username;
		logusers.password = $scope.password;
		logusers.$save(function(result){
			console.log('result is ', result);
			$scope.errorMessage = result.info;
			//$window.location = '#/Home'
		});

	}
}]);

app.controller('signupUser', ['$scope', '$resource','$window', function($scope, $resource, $window) {
	$scope.signUpNewUser = function(){
		var signUser = $resource('/api/signup');

		signUpUsers = new signUser();
		signUpUsers.username = $scope.username; 
		signUpUsers.password = $scope.password;
		signUpUsers.email = $scope.emailAddress;
		signUpUsers.name = $scope.name;

		signUpUsers.$save(function(result){
			console.log('new user saved');
			console.log('Hello, we have the response body: \n',result)
			alert('New User Created', result);
			$window.location = '#/Login';
			//res.redirect('/login');
		});
	}
}]);

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}