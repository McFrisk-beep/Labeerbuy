define('Kodella.KDLSuggestABeer.Model'
, 	[
		'SC.Model'
	,	'SC.Models.Init'
	,	'Application'
	,	'underscore'
	]
, 	function
	(
		SCModel
	,	ModelsInit
	,	Application
	, _
	)
{
	'use strict';

	return SCModel.extend({
		name: 'Kodella.KDLSuggestABeer.Model'

	,	list: function(options)
		{
			var self = this;
			var sabQuery = options.objSabQuery;

			var filters = [];

			var filters = [
				["isonline","is","T"],
				"AND",
				["isinactive","is","F"],
				"AND"
			];
			// filters.push(new nlobjSearchFilter('isonline', null, 'is', 'T'));
			// filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));

			if(sabQuery && sabQuery.length > 0){
				for(var i in sabQuery){
					var tisSabQuery = sabQuery[i];
					var arrFields = tisSabQuery.fields.split(',');
					for(var j in arrFields){
						// nlapiLogExecution('DEBUG', 'Trace Filter', 'Field=' + arrFields[j] + ' | operator=' + tisSabQuery.operator + ' | value=' + tisSabQuery.value);
						//filters.push(new nlobjSearchFilter(arrFields[j], null, tisSabQuery.operator, tisSabQuery.value));
						filters.push([arrFields[j], tisSabQuery.operator, tisSabQuery.value]);
						filters.push('OR');
					}
				}

				if(filters[filters.length-1] == 'OR'){
					filters.splice(filters.length-1, 1);
				}

				var columns = [
						new nlobjSearchColumn('internalid'),
						new nlobjSearchColumn('itemid'),
						new nlobjSearchColumn('urlcomponent')
					];

				var search = Application.getPaginatedSearchResults({
					results_per_page: 200
				,	columns: columns
				,	filters: filters
				,	record_type: 'item'
				});

	      return search;
			}

			return {'error':'true', 'errormessage': 'invalid query'}

		}

	});

});
