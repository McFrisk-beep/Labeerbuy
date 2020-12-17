// Kodella.KodellaCCT.QuoteView, this is the view your cct
// will load after dragged into the application

define('Kodella.KodellaCCT.Quote.View'
,	[
		'CustomContentType.Base.View'

	,	'kodella_kodellacct_quote.tpl'

	,	'jQuery'
	,	'underscore'
	]
,	function (
		CustomContentTypeBaseView

	,	kodella_kodellacct_quote_tpl

	,	jQuery
	,	_
	)
{
	'use strict';

	return CustomContentTypeBaseView.extend({

		template: kodella_kodellacct_quote_tpl

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
			// console.log('this.settings.custrecord_quotectatextcolor', this.settings.custrecord_quotectatextcolor)
			return {
				quote: this.settings.custrecord_quotetext,
				quoteTextColor: this.settings.custrecord_quotectatextcolor,
				author: this.settings.custrecord_quoteauthor,
				overlayimg: this.settings.custrecord_quoteoverlay_url,
				ctabtn: this.settings.custrecord_quotectatext,
				ctalink: this.settings.custrecord_quotectalink,
				overlaycolor: this.settings.custrecord_quotebgcolor
			};
		}
	});
});