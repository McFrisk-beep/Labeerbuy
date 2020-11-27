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
			var self = this;
			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/
			if(self.getCookie('ageverification')){
				jQuery("body").css("overflow", "unset");
			} else {
				jQuery("body").css("overflow", "hidden");
			}

		}

	,	events: {
			'click [data-action="legal"]': 'closeAgeVerification'
		,	'click [data-action="not-legal"]': 'redirectAgeVerification'
		}

	,	closeAgeVerification: function closeAgeVerification(e) {
			var self = this;
			self.setCookie('ageverification', true, 3);
			jQuery("body").css("overflow", "unset");
			jQuery('.ageverification-info-card').fadeOut('slow');
		}

	,	redirectAgeVerification: function redirectAgeVerification(e) {
			self.deleteCookie('ageverification');
			window.location = Configuration.get("kdlageverification.redirecturl");
		}

	, getCookie: function getCookie(name) {
				var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
				return v ? v[2] : null;
		}

	,	setCookie: function setCookie(name, value, days) {
				var d = new Date;
				d.setTime(d.getTime() + 24*60*60*1000*days);
				document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
		}

	,	deleteCookie: function deleteCookie(name) {
			var self = this;
			self.setCookie(name, '', -1);
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
