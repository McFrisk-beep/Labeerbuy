// @module Kodella.KodellaCCT.ProductCarousel

// An example cct that shows a message with the price, using the context data from the item

// Use: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/service.ss')) 
// to reference services or images available in your extension assets folder

define(
	'Kodella.KodellaCCT.ProductCarousel'
,   [
		'Kodella.KodellaCCT.ProductCarousel.View'
	]
,   function (
		ProductCarouselView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			container.getComponent('CMS').registerCustomContentType({
				
				// this property value MUST be lowercase
				id: 'cct_kodella_productcarousel'
				
				// The view to render the CCT
			,	view: ProductCarouselView
			});
		}
	};
});