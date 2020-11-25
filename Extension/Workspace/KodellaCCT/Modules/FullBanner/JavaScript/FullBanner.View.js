// Kodella.KodellaCCT.FullBannerView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.FullBanner.View'
,	[
		'CustomContentType.Base.View'

	,	'kodella_kodellacct_fullbanner.tpl'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView

	,	kodella_kodellacct_fullbanner_tpl

	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: kodella_kodellacct_fullbanner_tpl

		// As an example of the 'install' method, we are going to emulate a fetch to a service
		// Until the promise is resolved, you won't be able to edit the settings of this CCT
		// The same could happen with the 'update' method
	,	install: function (settings, context_data)
		{
			this._install(settings, context_data);

			// call some ajax here
			return jQuery.Deferred().resolve();
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
			// var message = 'Hello World I\'m a CCT!!';

			// //example of how to access context data from the item
			// if (this.contextData.item)
			// {
			// 	var item = this.contextData.item();
			// 	message = 'Special Offer!! ' + item.keyMapping_name + ' at $' + item.keyMapping_price + '.';
			// }

			// if you would want to get the settings from the SMT Panel you would consult
			// var field_value = this.settings.custrecord_<id of the custom field in the cct record>

			//Alignment
			var textAlignment = this.settings.custrecord_bannerpargalignment;
			var selectedAlignment = 'kdl_left_align';

			if(textAlignment == 2) {
				selectedAlignment = 'kdl_right_align';
			} else if (textAlignment == 3) {
				selectedAlignment = 'kdl_mid_align';
			} else if (textAlignment == 4) {
				selectedAlignment = 'kdl_bottom_align';
			}
			
			//Toggle Color
			var toggleColor = this.settings.custrecord_bannerbackground;
			var toggleColorText = false;

			if(toggleColor == 'T') {
				toggleColorText = true;
			}
			
			return {
				bannerimage: this.settings.custrecord_bannerimage_url,
				paragraph: this.settings.custrecord_bannerparagraph,
				linkurl: this.settings.custrecord_bannerlinkurl,
				linklabel: this.settings.custrecord_bannerlinklabel,
				alignment: selectedAlignment,
				withBG: toggleColorText,
				bgcolor: this.settings.custrecord_bannercolor,
				header: this.settings.custrecord_bannerheader
			};
		}
	});
});