
function service(request, response)
{
	'use strict';
	try 
	{
		require('KDL.KDLStickyHeader.KDLStickyHeader.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('KDL.KDLStickyHeader.KDLStickyHeader.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}