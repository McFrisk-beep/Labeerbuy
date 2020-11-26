// @module Kodella.KDLSuggestABeer.Main
define('Kodella.KDLSuggestABeer.Main.View'
,	[
		'kodella_kdlsuggestabeer_main.tpl'
	,	'Kodella.KDLSuggestABeer.Collection'
	,	'Kodella.KDLSuggestABeer.Main.SS2Model'

	,	'Item.Collection'
	, 'Kodella.KDLSuggestABeer.Cell.View'
	, 'kodella_kdlsuggestabeer_cell.tpl'

	, 'SC.Configuration'
	,	'Backbone'
	,	'Backbone.CollectionView'
	,	'Backbone.CompositeView'
	,	'jQuery'
	,	'Utils'
    ]
, function (
		kodella_kdlsuggestabeer_main_tpl
	,	KodellaKDLSuggestABeerCollection
	,	MainSS2Model

	, ItemCollection
	, KodellaKDLSuggestABeerCellView
	, kodella_kdlsuggestabeer_cell_tpl

	, Configuration
	,	Backbone
	,	BackboneCollectionView
	,	BackboneCompositeView
	, jQuery
	, Utils
)
{
    'use strict';

	// @class Kodella.KDLSuggestABeer.Main.View @extends Backbone.View
	return Backbone.View.extend({

		template: kodella_kdlsuggestabeer_main_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new MainModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });

		}

	,	events: {
			'click .sab-submit': 'clickedSubmit'
		}

	,	bindings: {
		}

	, childViews: {
		 'Sab.Items': function () {
		 			var self = this;

					return new BackboneCollectionView({
						childView: KodellaKDLSuggestABeerCellView
					,	childViewOptions: {
							application: self.application
						}
					,	viewsPerRow: 4
					,	collection: self.sabCollection
					,	cellTemplate: kodella_kdlsuggestabeer_cell_tpl
					});
		 	}
		}

	,	clickedSubmit: function(e){
			e.preventDefault();
			var self = this;
			var errormessage = Configuration.get('kdlsuggestabeer.errormessage');
			//let's build the data
			var arrSabQuery = [];
			jQuery('.sab-fields-container input').each(function(){
				if(jQuery(this).val().length > 0){
						var objSabQuery = {};
						objSabQuery.value = jQuery(this).val();
						objSabQuery.operator = jQuery(this).data('operator');
						objSabQuery.fields = jQuery(this).data('fields');
						arrSabQuery.push(objSabQuery);
				}
			});
			if(arrSabQuery.length > 0){
				var sabCollection = new KodellaKDLSuggestABeerCollection();
				var fetchPromise;
        fetchPromise = sabCollection.fetch({data:{'sabQuery':JSON.stringify(arrSabQuery)}});
				fetchPromise.done(function promiseDone() {
					var arrInternalId = _.map(sabCollection.models, function(tisModel){ return tisModel.get('internalid') });
					var strInternalids = arrInternalId.join(',');

					var itemCollection = new ItemCollection();
					var query = {
						id:strInternalids,
						fieldset:'search'
					}
					var fetchPromise2 = itemCollection.fetch({data:query})
					fetchPromise2.done(function(collectionResult){
						self.sabCollection = itemCollection;

						var collectionChildView = self.getChildViewInstance('Sab.Items');
            collectionChildView.collection = itemCollection;
            collectionChildView.render();

					})

				});
			} else {
				self.showError(errormessage);
			}

		}

		//@method getContext @return Kodella.KDLSuggestABeer.Main.View.Context
	,	getContext: function getContext()
		{
			var self = this;
			var beerQuestions = Configuration.get('kdlsuggestabeer.criteria') || [];

			return {
				beerQuestions: beerQuestions
			};
		}
	});
});
