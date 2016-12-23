( function () {
	'use strict';

	function Level2Ctrl ( quizFactory, heroesFactory, $interval, $state ) {
		var self = this;
		var timer;

		function filterRole ( role ) {
			return role === self.role;
		}

		function checkAnswer () {
			if ( self.hero.role.filter( filterRole ).length ) {
				quizFactory.pass( 1 );
			}

			$state.go( 'start' );
		}

		function stopTimer () {
			$interval.cancel( timer );
			timer = null;
			checkAnswer();
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
				self.role      = quizFactory.randomRole();
				self.roles     = quizFactory.getRoles();
				self.hero      = res.data[ Math.floor(Math.random() * res.data.length) ]
				self.time      = 3;
				self.stopTimer = stopTimer;

				startTimer();

			} )
			.catch( function ( err ) {
				console.log( err );
			} );
		}

		activate();
	}

	angular.module( 'app.quiz' )
		.controller( 'Level2Ctrl', Level2Ctrl );
} )();