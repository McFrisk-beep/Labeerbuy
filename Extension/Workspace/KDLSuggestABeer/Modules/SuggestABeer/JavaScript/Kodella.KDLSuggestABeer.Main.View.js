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
			this.itemsDisplayOptions = Utils.deepCopy(Configuration.get('itemsDisplayOptions'));

		}

	,	events: {
			'click .sab-submit': 'clickedSubmit'
		}

	,	bindings: {
		}

	, childViews: {
		 'Sab.Items': function () {
		 			var self = this;
		// 			var display_option = _.find(this.itemsDisplayOptions, function (option) {
		// 					return option.id === self.translator.getOptionValue('display');
		// 			});
		// 			return new BackboneCollectionView({
		// 					childTemplate: display_option.template,
		// 					childView: FacetsItemCellView,
		// 					childViewOptions: {
		// 							application: this.application
		// 					},
		// 					viewsPerRow: parseInt(display_option.columns, 10),
		// 					collection: this.model.get('items'),
		// 					cellTemplate: facets_items_collection_view_cell_tpl,
		// 					rowTemplate: facets_items_collection_view_row_tpl,
		// 					template: facets_items_collection_tpl,
		// 					context: {
		// 							keywords: this.translator.getOptionValue('keywords')
		// 					}
		// 			});


					return new BackboneCollectionView({
						childView: KodellaKDLSuggestABeerCellView
					,	childViewOptions: {
							application: self.application
						}
					,	viewsPerRow: 4
					,	collection: self.sabCollection
					,	cellTemplate: kodella_kdlsuggestabeer_cell_tpl
					});

					// return new BackboneCollectionView({
					// 	childTemplate: "facets_item_cell_grid_tpl",
					// 	childView: FacetsItemCellView,
					// 	childViewOptions: {
					// 		application: self.application
					// 	},
					// 	viewsPerRow: 4,
					// 	collection: self.itemCollection,
					// 	cellTemplate: facets_items_collection_view_cell_tpl,
					// 	rowTemplate: facets_items_collection_view_row_tpl,
					// 	template: facets_items_collection_tpl
					// 	// context: {
					// 	// 		keywords: this.translator.getOptionValue('keywords')
					// 	// }
					// });

					// return new FacetsItemsCollectionView_1.FacetsItemsCollectionView({
					// 		application: self.application,
					// 		// keywords: this.translator.getOptionValue('keywords'),
					// 		collection: self.collection,
					// 		viewsPerRow: 4,
					// 		cellViewTemplate: "facets_item_cell_grid_tpl"
					// });
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
					console.log('sabCollection', sabCollection);

					var arrInternalId = _.map(sabCollection.models, function(tisModel){ return tisModel.get('internalid') });
					console.log('arrInternalId', arrInternalId);
					var strInternalids = arrInternalId.join(',');
					console.log('strInternalids', strInternalids);
					// var	display_option = _.find(self.itemsDisplayOptions, function (option)
					// {
					// 	return option.id === self.translator.getOptionValue('display');
					// });

					var itemCollection = new ItemCollection();
					var query = {
						id:strInternalids,
						fieldset:'search'
					}
					var fetchPromise2 = itemCollection.fetch({data:query})
					fetchPromise2.done(function(collectionResult){
						console.log('itemCollection', itemCollection);
						self.sabCollection = itemCollection;
						// var newChildView = new BackboneCollectionView({
						// 	// childTemplate: display_option.template,
						// 	childView: FacetsItemCellView,
						// 	childViewOptions: {
						// 			application: this.application
						// 	},
						// 	viewsPerRow: 4,
						// 	collection: itemCollection,
						// 	cellTemplate: facets_items_collection_view_cell_tpl,
						// 	rowTemplate: facets_items_collection_view_row_tpl,
						// 	template: facets_items_collection_tpl
						// 	// context: {
						// 	// 		keywords: this.translator.getOptionValue('keywords')
						// 	// }
						// });

						// newChildView.setElement('.sab-items').render();
						// self.render();
						var collectionChildView = self.getChildViewInstance('Sab.Items');
						console.log('collectionChildView', collectionChildView);
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
