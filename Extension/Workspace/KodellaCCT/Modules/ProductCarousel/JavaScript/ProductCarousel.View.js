// Kodella.KodellaCCT.ProductCarouselView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.ProductCarousel.View'
,	[
		'CustomContentType.Base.View'
	,	'Kodella.KodellaCCT.ProductCarousel.Collection'
	,	'kodella_kodellacct_productcarousel.tpl'
	,	'SC.Configuration'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView
	,	KDCCTCollection
	,	kodella_kodellacct_productcarousel_tpl
	,	Configuration

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
			this.on('afterViewRender', this.initSliderCustom, this);
			// call some ajax here
			return jQuery.Deferred().resolve();
		}
	,	initSliderCustom: function initSliderCustom () {
			var self = this;

			var viewWidth = jQuery(window).width();
			var containerWidth = jQuery('.kdl-productslider-content').width();
			var carouselConfig = {
				nextText: '<a class="kdl-next-icon"><i></i></a>',
				prevText: '<a class="kdl-prev-icon"><i></i></a>',
				auto: false,
				minSlides: 1,
				maxSlides: 4,
				moveSlides: 1,
				pager: false,
				slideWidth: Math.floor((containerWidth - 20) / 4),
				preloadImages: 'all',
				wrapperClass:'bx-wrapper',
				easing:'ease',
				adaptiveHeight: true,
				
				// infiniteLoop: false,
				// hideControlOnEnd: true
			}
			
			if (SC.ENVIRONMENT.jsEnvironment === 'browser') {
				window.setTimeout(function timeout() {
					if(viewWidth <= 767) {
						carouselConfig.maxSlides = 2;
						carouselConfig.slideWidth = Math.floor((containerWidth) / 2);
						_.initBxSlider(self.$('.kdlpc-slider'), carouselConfig);
					}
					if(viewWidth >= 768 && viewWidth <= 1199) {
						carouselConfig.maxSlides = 3;
						carouselConfig.slideWidth = Math.floor((containerWidth) / 3);
						_.initBxSlider(self.$('.kdlpc-slider'), carouselConfig);
					} else if (viewWidth >= 1200) {
						carouselConfig.maxSlides = 4;
						carouselConfig.slideWidth = Math.floor((containerWidth) / 4);
						_.initBxSlider(self.$('.kdlpc-slider'), carouselConfig);
					}
				},0);
			}
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