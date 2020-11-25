// Kodella.KodellaCCT.HalfBannerView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.HalfBanner.View'
,	[
		'CustomContentType.Base.View'

	,	'kodella_kodellacct_halfbanner.tpl'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView

	,	kodella_kodellacct_halfbanner_tpl

	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: kodella_kodellacct_halfbanner_tpl

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
			//Alignment
			var textAlignment = this.settings.custrecord_halfposition;
			var selectedAlignment = 'kdl_right_align';

			if(textAlignment == 2) {
				selectedAlignment = 'kdl_left_align';
			}
			
			return {
				bannerimage: this.settings.custrecord_halfimage_url,
				paragraph: this.settings.custrecord_halfdescription,
				linkurl: this.settings.custrecord_halfurl,
				linklabel: this.settings.custrecord_halfurllabel,
				alignment: selectedAlignment,
				header: this.settings.custrecord_halfheader
			};
		}
	});
});