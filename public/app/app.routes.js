angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider

		.when('/', {
			templateUrl: 'app/views/pages/home.html',
		})

		/*.when('/', {
			templateUrl: 'app/views/pages/contact.html',
		})*/
		
	$locationProvider.html5Mode(true);
})

/*.run(function($rootScope){

	$rootScope.$on('$routeChangeSuccess', function(event, current, previous){
		$rootScope.title = current.$route.title;
	});
})*/