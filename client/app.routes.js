( function () {
	'use strict';

	function config ( $stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise( '/' );
		$stateProvider.state( 'home', {
			'url'          : '/',
			'templateUrl'  : '/home/home.html'
		} )
		.state( 'start', {
			'url' : '/start',
			'templateUrl' : '/quiz-list/list.html',
			'controller' : 'ListController',
			'controllerAs' : 'vm'
		} )
		.state( 'level1', {
			'templateUrl' : '/level1/level1.html',
			'controller' : 'Level1Controller',
			'controllerAs' : 'vm'
		} )
		.state( 'level2', {
			'templateUrl' : '/level2/level2.html',
			'controller' : 'Level2Ctrl',
			'controllerAs' : 'vm'
		} )
		.state( 'level3', {
			'templateUrl' : '/level3/level3.html',
			'controller' : 'Level3Ctrl',
			'controllerAs' : 'vm'
		} );
	}

	angular.module( 'app.routes', [] )
		.config( config )
} )();