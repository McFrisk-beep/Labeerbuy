/* jshint esversion: 5 */

// This should be deleted ASAP!!! And never more used in future
// This is a workaround to avoid break sites due to the modules
// that changed the way they're exported

// HEADS UP! Keep this using "var" instead const/let because
// it's not being transpiled and needs to run in SEO
(function() {
    srcRequire = require;
    var srcDefine = define;

    var modulesMap = {
        'Footer.Simplified.View': 'FooterSimplifiedView',
        'Footer.View': 'FooterView',
        'GlobalViews.Message.View': 'GlobalViewsMessageView',
        'GlobalViews.Pagination.View': 'GlobalViewsPaginationView',
        'GlobalViews.ShowingCurrent.View': 'GlobalViewsShowingCurrentView',
        'ListHeader.View': 'ListHeaderView',
        'Profile.Model': 'ProfileModel',
        Configuration: 'Configuration',
        'Address.Model': 'AddressModel',
        'Address.Details.View': 'AddressDetailsView',
        AjaxRequestsKiller: 'AjaxRequestsKiller',
        'Categories.Model': 'CategoriesModel',
        'Newsletter.Model': 'NewsletterModel',
        'Newsletter.View': 'NewsletterView',
        MyAccountMenu: 'MyAccountMenu',
        'RecordViews.View': 'RecordViewsView',
        'ReorderItems.Actions.Quantity.View': 'ReorderItemsActionsQuantityView',
        'SC.MyAccount.Layout': 'MyAccountLayout',
        'Transaction.Line.Views.Cell.Navigable.View': 'TransactionLineViewsCellNavigableView',
        'Quote.Details.View': 'QuoteDetailsView',
        ApplicationLayout: 'ApplicationLayout',
        Application: 'Application'
    };
    var namesMap = {
        'SC.Configuration': 'Configuration',
        'ApplicationSkeleton.Layout': 'ApplicationLayout'
    };

    function mapNames(deps) {
        // Workaround for Modules that changed its name
        for (var i = 0; i < (deps || []).length; i++) {
            var newName = namesMap[deps[i]];
            if (newName) {
                deps[i] = newName;
            }
        }

        return deps;
    }

    function mapModules(modules, deps) {
        for (var i = 0; i < (deps || []).length; i++) {
            var exportedName = modulesMap[deps[i]];
            if (exportedName) {
                modules[i] = modules[i][exportedName];
            }
        }

        return modules;
    }

    function getNewCallback(deps, callback) {
        function newCallback() {
            var modules = mapModules(arguments, deps);
            return callback && callback.apply(null, modules);
        }

        return newCallback;
    }

    function copyProperties(source, dest) {
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                dest[property] = source[property];
            }
        }
    }

    require = function(deps, callback, failCallback) {
        if (deps.splice) {
            deps = mapNames(deps);
            return srcRequire(deps, getNewCallback(deps, callback), failCallback);
        }

        var newName = mapNames([deps])[0];
        var module = srcRequire(newName);
        return mapModules([module], [newName])[0];
    };

    define = function(name, deps, callback) {
        if (typeof name !== 'string' || SC.ENVIRONMENT.JS_MODULE_NAMES.indexOf(name) !== -1) {
            return srcDefine.call(null, name, deps, callback);
        }

        deps = mapNames(deps);

        // Workaround for the other affected modules
        var newCallback = getNewCallback(deps, callback);

        if (typeof name !== 'string') {
            // Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
            // This module may not have dependencies
            if (!deps.splice) {
                callback = deps;
                deps = null;
                return srcDefine.call(null, newCallback);
            }
            return srcDefine.call(null, deps, newCallback);
        }
        return srcDefine.call(null, name, deps, newCallback);
    };

    copyProperties(srcDefine, define);
    copyProperties(srcRequire, require);
})();
