// Model.js
// -----------------------
// @module Case
define("Kodella.KDLAgeVerification.HomePage.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/HomePage/SuiteScript2/HomePage.Service.ss"
            ),
            true
        )
});
});
