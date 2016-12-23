( function () {
	'use strict';

	function Level1Controller ( quizFactory, heroesFactory, $interval, $state ) {
		var self = this;
		var timer;

		function selectHero ( hero ) {
			console.log('here')
			self.allHeroes.splice( self.allHeroes.indexOf( hero ), 1 );
			self.selectedHeroes.push( hero );
		}

		function stopTimer () {
			$interval.cancel( timer );
			timer = null;
			compute();
		}

		function startTimer () {
			timer = $interval( function () {
				if ( self.time > 0 ) {
					self.time--;
				} else {
					stopTimer();
				}
			}, 1000 );
		}

		function activate () {
			heroesFactory.fetchHeroes().then( function ( res ) {
				heroesFactory.bindHeroes( res.data );
				self.type = quizFactory.randomType();
				self.role = quizFactory.randomRole();
				self.attack = quizFactory.randomAttack();
				self.heroes = quizFactory.getHeroesWithCombination( self.type, self.role, self.attack );
				self.allHeroes = res.data;
				self.selectedHeroes = [];
				self.time = 10;

				self.selectHero = selectHero;
				self.stopTimer = stopTimer;

				startTimer();

			} )
			.catch( function ( err ) {
				console.log( err );
			} );
		}

		function compute () {
			var score = 0;

			angular.forEach( self.selectedHeroes, function ( hero ) {
				var found = self.heroes.filter( function ( item ) {
					return item === hero;
				} );

				if ( found ) {
					score++;
				}
			} );

			if ( score >= self.heroes.length ) {
				quizFactory.pass( 0 );
			}

			$state.go( 'start' );
		}

		activate();
	}

	angular.module( 'app.quiz' )
		.controller( 'Level1Controller', Level1Controller );
} )();