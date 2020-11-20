// @module Kodella.KDLAgeVerification.HomePage
define('AgeVerification.View'
,	[
	'ageverification.tpl'
	
	,	'Kodella.KDLAgeVerification.HomePage.SS2Model'
	,	'SC.Configuration'
	,	'Backbone'
	,	'jQuery'
    ]
, function (
	ageverification_tpl
	
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

      		Configuration.get("kdlklarna.merchconfirmation")
		}

	,	events: {
			'click [data-action="legal"]': 'closeAgeVerification'
		,	'click [data-action="not-legal"]': 'redirectAgeVerification'
		}

	,	closeAgeVerification: function closeAgeVerification(e) {
			//jQuery('.ageverification-info-card').hide();
			jQuery('.ageverification-info-card').fadeOut('slow');
		}

	,	redirectAgeVerification: function redirectAgeVerification(e) {
			console.log('redirect');
			window.location = Configuration.get("kdlageverification.redirecturl");
		}

		//@method getContext @return Kodella.KDLAgeVerification.HomePage.View.Context
	,	getContext: function getContext()
		{
			
		}
	});
});
