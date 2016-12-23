( function () {
	'use strict';

	function heroesFactory ( $http ) {
		var heroes;
		function fetchHeroes () {
			return $http.get( '/factories/heroes.json' );
		}

		function bindHeroes ( res ) {
			heroes = res;
		}

		function getHeroesWithCombination ( type, role, attackType ) {
			return ( heroes || [] ).filter( function ( item ) {
				return item.type === type && item.role.indexOf( role ) !== -1 && item.attackType === attackType;
			} );
		}

		return {
			'fetchHeroes' : fetchHeroes,
			'getHeroesWithCombination' : getHeroesWithCombination,
			'bindHeroes' : bindHeroes
		}
	}

	angular.module( 'app.factories' )
		.factory( 'heroesFactory', heroesFactory );
} )();