define("Kodella.KDLSuggestABeer.Main.ServiceController",
  [
    "ServiceController",
    "Kodella.KDLSuggestABeer.Model"
  ], 
  function(
    ServiceController,
    KodellaKDLSuggestABeerModel
) {
  "use strict";

  return ServiceController.extend({
    name: "Kodella.KDLSuggestABeer.Main.ServiceController",

    // The values in this object are the validation needed for the current service.
    options: {
      common: {}
    },

    get: function get() {
      var options = {};
			var strSabQuery = this.request.getParameter('sabQuery');
      if(strSabQuery.length > 0){
        options.objSabQuery = JSON.parse(strSabQuery);
      }
			return ( KodellaKDLSuggestABeerModel.list(options) || []);

      // return JSON.stringify({
      //   message: "Hello World I'm an Extension using a Service!"
      // });
    },

    post: function post() {
      // not implemented
    },

    put: function put() {
      // not implemented
    },

    delete: function() {
      // not implemented
    }
  });
});
