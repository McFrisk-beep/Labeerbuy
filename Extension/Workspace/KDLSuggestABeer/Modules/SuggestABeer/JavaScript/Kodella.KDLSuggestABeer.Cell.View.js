define(
	'Kodella.KDLSuggestABeer.Cell.View'
,	[
		'Backbone.CompositeView'
	,	'kodella_kdlsuggestabeer_cell.tpl'
	,	'Profile.Model'

	,	'Backbone'
	]
,	function (
		BackboneCompositeView
	,	kodella_kdlsuggestabeer_cell_tpl
	,	ProfileModel

	,	Backbone
	)
{
	'use strict';

	return Backbone.View.extend({

		//@property {Function} template
		template: kodella_kdlsuggestabeer_cell_tpl

	,	initialize: function () {
			if (SC.ENVIRONMENT.jsEnvironment === 'browser') {
				window.setTimeout(function timeout() {
					$('.sab-container').addClass('sab-showresults');
					$('html, body').animate({
						scrollTop: $('.sab-items').offset().top
					}, 800);
				},0);
			}
		}
	,	getContext: function ()
		{
			var self = this;
			var model = self.model;

			return {
				name: model.get('displayname'),
				thumb: model.get('itemimages_detail') ? model.get('itemimages_detail').urls[0].url : model.get('itemimages_detail').urls[0].altimagetext,
				url: model.get('_url'),
				showprice: !ProfileModel.getInstance().hidePrices(),
				price:  model.get('onlinecustomerprice_formatted')
			};

		}
	});
});
//@property {Item.Model} model
