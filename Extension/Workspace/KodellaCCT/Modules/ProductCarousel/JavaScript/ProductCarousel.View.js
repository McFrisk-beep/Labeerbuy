// Kodella.KodellaCCT.ProductCarouselView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.ProductCarousel.View'
,	[
		'CustomContentType.Base.View'
	,	'Kodella.KodellaCCT.ProductCarousel.Collection'
	,	'kodella_kodellacct_productcarousel.tpl'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView
	,	KDCCTCollection
	,	kodella_kodellacct_productcarousel_tpl

	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: kodella_kodellacct_productcarousel_tpl

		// As an example of the 'install' method, we are going to emulate a fetch to a service
		// Until the promise is resolved, you won't be able to edit the settings of this CCT
		// The same could happen with the 'update' method
	,	install: function (settings, context_data)
		{
			this._install(settings, context_data);

			var self = this;
			self.getProductList(self.settings.custrecord_productcategory);
			// call some ajax here
			return jQuery.Deferred().resolve();
		}
	,	getProductList: function(selectedCategory){
			var self = this;
			var cctProdCollection = new KDCCTCollection();
			
			var fetchdata = {
				commercecategoryid : parseInt(selectedCategory),
				limit: 8,
				offset: 0,
				sort: 'commercecategory:asc'
			};
			cctProdCollection.fetch(
				{
					data: fetchdata
				}
			).done(function (){
				// console.log('rota cctProdCollection', cctProdCollection);
				self.cctProdCollection = cctProdCollection;
				self.render();
			});
		}
		// The list of contexts that you may need to run the CCT
	,	contextDataRequest: ['item']

		// By default when you drop a CCT in the SMT admin, it will run the 'validateContextDataRequest' method to check that you have
		// all the requested contexts and it will fail if some context is missing.
	,	validateContextDataRequest: function validateContextDataRequest()
		{
			return true;
		}

	,	getContext: function getContext()
		{
			var message = 'Hello World I\'m a CCT!!';
			var items = this.cctProdCollection;

			//example of how to access context data from the item
			if (this.contextData.item)
			{
				var item = this.contextData.item();
				message = 'Special Offer!! ' + item.keyMapping_name + ' at $' + item.keyMapping_price + '.';
			}

			// if you would want to get the settings from the SMT Panel you would consult
			// var field_value = this.settings.custrecord_<id of the custom field in the cct record>
			return {
				message: message
			,	header: this.settings.custrecord_productheader
			,	subheader: this.settings.custrecord_productsubheader
			,	linklabel: this.settings.custrecord_productlinklabel
			,	linkurl: this.settings.custrecord_productlink
			,	items: items
			};
		}
	});
});