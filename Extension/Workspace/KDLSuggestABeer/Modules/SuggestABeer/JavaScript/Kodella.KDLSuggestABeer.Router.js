define('Kodella.KDLSuggestABeer.Router',
    [
        'Kodella.KDLSuggestABeer.Main.View',
        'Kodella.KDLSuggestABeer.Collection',
        'ErrorManagement.PageNotFound.View',
        'Backbone'
    ],
    function define(
        SuggestABeerMainView,
        SuggestABeerCollection,
        PageNotFoundView,
        Backbone
    ) {
        'use strict';

        return Backbone.Router.extend({
          routes:
          {
            'suggestabeer': 'showSuggestABeer'
          }

        , initialize: function (application)
          {
            this.application = application
          }

        , showSuggestABeer: function ()
          {
            var self = this;
            var view;
            view = new SuggestABeerMainView({
                      //collection: collection,
                      application: self.application
                  });
            view.showContent();

            // var collection = new SchecterDealerPageCollection();
            // var fetchPromise;

            // fetchPromise = collection.fetch();
            // fetchPromise.done(function renderView() {
            //   if (collection.length > 0) {
            //       view = new SchecterDealerPageView({
            //           collection: collection,
            //           application: self.application
            //       });
            //       view.showContent();
            //   } else {
            //       view = new PageNotFoundView({ application: self.application });
            //       view.showContent();
            //   }
            // });

          }

        });

      });
