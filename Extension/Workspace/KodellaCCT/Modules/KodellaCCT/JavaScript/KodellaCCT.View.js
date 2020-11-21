// @module Kodella.KodellaCCT.KodellaCCT
define('Kodella.KodellaCCT.KodellaCCT.View'
,	[
	'kodella_kodellacct_kodellacct.tpl'
	
	,	'Kodella.KodellaCCT.KodellaCCT.SS2Model'
	
	,	'Backbone'
    ]
, function (
	kodella_kodellacct_kodellacct_tpl
	
	,	KodellaCCTSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class Kodella.KodellaCCT.KodellaCCT.View @extends Backbone.View
	return Backbone.View.extend({

		template: kodella_kodellacct_kodellacct_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new KodellaCCTModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return Kodella.KodellaCCT.KodellaCCT.View.Context
	,	getContext: function getContext()
		{
			//@class Kodella.KodellaCCT.KodellaCCT.View.Context
			// this.message = this.message || 'Hello World!!'
			// return {
			// 	message: this.message
			// };
		}
	});
});
