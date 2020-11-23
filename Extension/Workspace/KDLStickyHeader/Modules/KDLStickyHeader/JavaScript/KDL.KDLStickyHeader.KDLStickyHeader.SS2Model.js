// Model.js
// -----------------------
// @module Case
define("KDL.KDLStickyHeader.KDLStickyHeader.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/KDLStickyHeader/SuiteScript2/KDLStickyHeader.Service.ss"
            ),
            true
        )
});
});
