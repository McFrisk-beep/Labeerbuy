define(
	'Kodella.KDLSuggestABeer.Cell.View'
,	[
		'Backbone.CompositeView'
	,	'kodella_kdlsuggestabeer_cell.tpl'

	,	'Backbone'
	]
,	function (
		BackboneCompositeView
	,	kodella_kdlsuggestabeer_cell_tpl

	,	Backbone
	)
{
	'use strict';

	return Backbone.View.extend({

		//@property {Function} template
		template: kodella_kdlsuggestabeer_cell_tpl

	,	initialize: function ()
		{
			// Backbone.View.prototype.initialize.apply(this, arguments);
			// BackboneCompositeView.add(this);
		}

	// ,	contextData: {
	// 		'item': function ()
	// 		{
	// 			return this.model;
	// 		}
	// 	}
	,	getContext: function ()
		{
			var self = this;
			var model = self.model;

			return {
				name: model.get('name'),
				thumb: model.get('thumb') ? model.get('thumb').name : '',
				url: model.get('url')
			};

		}
	});
});
//@property {Item.Model} model
