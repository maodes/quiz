( function () {
	'use strict';

	function ListController ( heroesFactory, quizFactory ) {
		var self = this;

		function checkLevel ( level ) {
			var levelBefore = false;

			if ( level.index > 0 ) {
				levelBefore = !self.levelList[ level.index-1 ].pass;
			}

			return level.pass || levelBefore;

		}

		function getPassCode () {
			return quizFactory.getPassCode();
		}

		function showPassCode () {
			return getPassCode() !== '';
		}

		function activate () {
			self.levelList = quizFactory.getLevels();
			self.checkLevel = checkLevel;
			self.getPassCode = getPassCode;
			self.showPassCode = showPassCode;
		}

		activate();
	}

	angular.module( 'app.quiz' )
		.controller( 'ListController', ListController );
} )();