// @module Kodella.KDLAgeVerification.HomePage
define('AgeVerification.View'
,	[
		'ageverification.tpl'
	,	'Home.View'
	
	,	'Kodella.KDLAgeVerification.HomePage.SS2Model'
	,	'SC.Configuration'
	,	'Backbone'
	,	'jQuery'
    ]
, function (
		ageverification_tpl
	,	HomeView
	
	,	HomePageSS2Model
	,	Configuration
	,	Backbone
	,	jQuery
)
{
    'use strict';

	// @class Kodella.KDLAgeVerification.HomePage.View @extends Backbone.View
	return Backbone.View.extend({

		template: ageverification_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			jQuery("body").css("overflow", "hidden");

		}

	,	events: {
			'click [data-action="legal"]': 'closeAgeVerification'
		,	'click [data-action="not-legal"]': 'redirectAgeVerification'
		}

	,	closeAgeVerification: function closeAgeVerification(e) {
			jQuery("body").css("overflow", "unset");
			jQuery('.ageverification-info-card').fadeOut('slow');
		}

	,	redirectAgeVerification: function redirectAgeVerification(e) {
			window.location = Configuration.get("kdlageverification.redirecturl");
		}

		//@method getContext @return Kodella.KDLAgeVerification.HomePage.View.Context
	,	getContext: function getContext()
		{
			return {
				bgimg: 'img/beer-beach.jpg'
			}
		}
	});
});
