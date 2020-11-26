// Kodella.KodellaCCT.ProductCarouselView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.ProductCarousel.View'
,	[
		'CustomContentType.Base.View'
	,	'Kodella.KodellaCCT.ProductCarousel.Collection'
	,	'kodella_kodellacct_productcarousel.tpl'
	,	'LiveOrder.Model'
	,	'SC.Configuration'
	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView
	,	KDCCTCollection
	,	kodella_kodellacct_productcarousel_tpl
	,	LiveOrderModel
	,	Configuration
	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: kodella_kodellacct_productcarousel_tpl

	,	events: {
			'click [data-action="select"]': 'toggleAddToBag2'
		,	'click [data-action="add-to-cart"]': 'addToCart'
		}
	,	toggleAddToBag2: function toggleAddToBag2(e) {
			jQuery("[data-action='select']").each(function(){
				jQuery(this).removeClass("active");
			});
			
			jQuery(e.target).addClass("active");
			jQuery(e.target).parent().parent().find("#global-product-add-to-bag").css("display", "block");
		}
	,	addToCart: function addToCart(e) {
			var self = this
			, cart = LiveOrderModel.getInstance()
			, item_id = null;
			

			item_id = jQuery(e.target).attr("data-value");

			var line = {
					freeGift: false
				,	fulfillmentChoice: "ship"
				,	item: {
						internalid: item_id
					}
				,	internalid: item_id
				,	quantity: 1
				};

			var cart_promise = cart.addLine(line);
			
			jQuery(e.target).text("ADDING...");

			cart_promise.done(function (){

				jQuery("[data-view='Header.MiniCart']").addClass("open");
				jQuery(e.target).text("ADDED TO BAG");
				jQuery(e.target).bind("click", function(){
					return false;
				});
			});
		}
	,	getProductList: function(selectedCategory){
			var self = this;
			var cctProdCollection = new KDCCTCollection();
			
			var fetchdata = {
				commercecategoryurl : selectedCategory,
				limit: 3,
				offset: 0,
				sort: 'commercecategory:asc'
			};
			cctProdCollection.fetch(
				{
					data: fetchdata
				}
			).done(function (){
				// console.log('cctProdCollection', cctProdCollection);
				self.cctProdCollection = cctProdCollection;
				self.render();
			});
		}
	,	install: function (settings, context_data)
		{
			this._install(settings, context_data);

			var self = this;
			var selectedCategory = self.settings.custrecord_productcategory;
			// selectedCategory = selectedCategory.replace(/\+/g, '').toLowerCase();
			// var selectedCategory = "Irving Place Studio";
			var cat = SC.CATEGORIES;

			// call some ajax here
			var tisCategory = self.getCategory(cat, selectedCategory);
			self.getProductList(tisCategory.fullurl);
			
			return jQuery.Deferred().resolve();
		}
	,	getCategory: function(categoryList, name) {
			var self = this;
			var selectedCategory;
			for(var i=0; i<categoryList.length; i++){
				if(categoryList[i].name == name){
					selectedCategory = categoryList[i];
					break;
				}else{
					if(categoryList[i].categories && categoryList[i].categories.length > 0 ){
						selectedCategory = self.getCategory(categoryList[i].categories, name);
						if(selectedCategory){
							break;
						}
					}
				}
			}
			return selectedCategory;
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
			//var cctExtensions = Configuration.get('kdlcctextension.kdlcctproducts', []);
			var items = this.cctProdCollection;
			// console.log('ROTA this', this.settings);

			//example of how to access context data from the item
			if (this.contextData.item)
			{
				var item = this.contextData.item();
				message = 'Special Offer!! ' + item.keyMapping_name + ' at $' + item.keyMapping_price + '.';
			}

			if(items){
				items = this.cctProdCollection;

				var new_collection = _.each(items.models,function(item){
					return item;

				});

				// for(var i in new_collection){
				// 	var tisItem = new_collection[i];
				// 	var tismatrixchilditems = tisItem.get('_matrixChilds').models;
				// 	if(tismatrixchilditems && tismatrixchilditems.length > 0){
				// 			if(Number(tismatrixchilditems[0].get('custitem_psgss_product_size'))){
				// 				var arrSorted = _.sortBy(tismatrixchilditems, function(tisChild){ return tisChild.get('custitem_psgss_product_size'); });
				// 				tismatrixchilditems = arrSorted;
				// 			}
				// 			tisItem.get('_matrixChilds').models = tismatrixchilditems;
				// 	}
				// }
			}
			
			return {
				message: message
			,	items: new_collection?new_collection:[]
			,	header: this.settings.custrecord_productheader
			,	subheader: this.settings.custrecord_productsubheader
			,	linklabel: this.settings.custrecord_productlink
			,	linkurl: this.settings.custrecord_productlinklabel
			};
		}
	});
});