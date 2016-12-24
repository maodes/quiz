( function () {
	'use strict';

	function quizFactory ( heroesFactory ) {
		var levels = [ {
			'level' : 1,
			'levelName' : 'Click All You Can',
			'description' : 'Click Heroes that fit the requirements',
			'points' : 0,
			'perfectPoints' : 10,
			'state' : 'level1',
			'pass' : false,
			'index' : 0
		}, {
			'level' : 2,
			'levelName' : 'So, What\'s my role?',
			'description' : 'Choose role for each Hero',
			'points' : 0,
			'perfectPoints' : 10,
			'state' : 'level2',
			'pass' : false,
			'index' : 1
		}, {
			'level' : 3,
			'levelName' : 'Keyboard Wrecker',
			'description' : 'Name as many heroes as you can under the given type',
			'points' : 0,
			'perfectPoints' : 10,
			'state' : 'level3',
			'pass' : false,
			'index' : 2
		} ];

		var role = [ 'carry', 'disabler', 'initiator', 'jungler', 'support', 'durable', 'nuker', 'pusher', 'escape' ]

		var type = [ 'strength', 'agility', 'intelligence' ];

		var attacktype = [ 'ranged', 'melee' ];

		var passCode = '';

		function randomType () {
			return type[ Math.floor( Math.random() * type.length) ];
		}

		function randomRole () {
			return role[ Math.floor( Math.random() * role.length ) ];
		}

		function randomAttack () {
			return attacktype[ Math.floor( Math.random() * attacktype.length ) ];
		}

		function getLevels () {
			return levels;
		}

		function getRoles () {
			return role
		}

		function getHeroesWithCombination ( type, role, attacktype ) {
			return heroesFactory.getHeroesWithCombination( type, role, attacktype )
		}

		function pass ( index ) {
			levels[ index ].pass = true;

			if ( index === 2 ) {
				passCode = 'BloodThorn'
			}
		}

		function getPassCode () {
			return passCode;
		}

		return {
			'randomType' : randomType,
			'randomRole' : randomRole,
			'randomAttack' : randomAttack,
			'getLevels' : getLevels,
			'getRoles' : getRoles,
			'getHeroesWithCombination' : getHeroesWithCombination,
			'pass' : pass,
			'getPassCode' : getPassCode
		}
	}

	angular.module( 'app.factories' )
		.factory( 'quizFactory', quizFactory );
} )();