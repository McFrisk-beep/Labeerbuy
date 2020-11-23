// @module KDL.KDLStickyHeader.KDLStickyHeader
define('KDL.KDLStickyHeader.KDLStickyHeader.View'
,	[
	'kdl_kdlstickyheader_kdlstickyheader.tpl'
	
	,	'KDL.KDLStickyHeader.KDLStickyHeader.SS2Model'
	
	,	'Backbone'
    ]
, function (
	kdl_kdlstickyheader_kdlstickyheader_tpl
	
	,	KDLStickyHeaderSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class KDL.KDLStickyHeader.KDLStickyHeader.View @extends Backbone.View
	return Backbone.View.extend({

		template: kdl_kdlstickyheader_kdlstickyheader_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new KDLStickyHeaderModel();
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

		//@method getContext @return KDL.KDLStickyHeader.KDLStickyHeader.View.Context
	,	getContext: function getContext()
		{
			//@class KDL.KDLStickyHeader.KDLStickyHeader.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
