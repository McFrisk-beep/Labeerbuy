define('Kodella.KDLSuggestABeer.Collection'
,	[
    'Backbone.CachedCollection'

	,	'underscore'
	,	'Utils'
	]
,	function
	(
    BackboneCachedCollection

	,	_
	,	Utils
	)
{
	'use strict'

	return BackboneCachedCollection.extend({

		// model: Model
		url: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/SuggestABeer.Service.ss')),
    parse: function parse(response)
  		{
        var parsedBeer = _.map(response.records, function(tisBeer){
          var objBeer = {};
          objBeer.internalid = tisBeer.columns.internalid.name;
          objBeer.itemid = tisBeer.columns.itemid;
          objBeer.urlcomponent = tisBeer.columns.urlcomponent;

          return objBeer;
        });
      	return parsedBeer;
  		}
	})
});
