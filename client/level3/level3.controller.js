( function () {
	'use strict';

	function Level3Ctrl ( quizFactory, heroesFactory, $interval, $state ) {
		var self = this;
		var timer;

		function checkHeroes () {
			var score = 0;
			angular.forEach( self.typedHeroes, function ( item ) {
				var filtered = self.allHeroes.filter( function ( hero ) {
					return hero.name === item;
				} );

				if ( filtered[0] && filtered[0].type === self.type ) {
					score++;
				}
			} );

			if ( score >= 5 ) {
				quizFactory.pass( 2 );
			}

			$state.go( 'start' );
		}

		function stopTimer () {
			$interval.cancel( timer );
			timer = null;
			checkHeroes();
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

		function pressed ( ev ) {
			if ( ev.keyCode === 13 ) {
				self.typedHeroes.push( self.hero[ 0 ].toUpperCase() + self.hero.substring( 1 ) )
				self.hero = '';
			}
		}

		function activate () {
			heroesFactory.fetchHeroes().then( function ( res ) {
				heroesFactory.bindHeroes( res.data );
				self.allHeroes = res.data;
				self.type = quizFactory.randomType();
				self.typedHeroes = [];
				self.time = 15;
				self.hero = '';

				self.pressed = pressed;

				startTimer();

			} )
			.catch( function ( err ) {
				console.log( err );
			} );
		}

		activate();
	}

	angular.module( 'app.quiz' )
		.controller( 'Level3Ctrl', Level3Ctrl );
} )();