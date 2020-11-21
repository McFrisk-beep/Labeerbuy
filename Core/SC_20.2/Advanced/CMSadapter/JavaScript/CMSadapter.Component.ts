/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="CMSadapter.Component"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts" />

import * as _ from 'underscore';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

import CustomContentTypeContainerView = require('../../CustomContentType/JavaScript/CustomContentType.Container.View');
import { SCBaseComponent } from '../../../Commons/SC/JavaScript/SC.BaseComponent';
import { SCBaseComponentChildViewsComponent } from '../../../Commons/SC/JavaScript/SC.BaseComponent.ChildViewsComponent';
import { ChildViewGenerator } from '../../../Commons/Core/JavaScript/View';

interface RawCCT {
    id: string;
    instance_id: string;
    selector: {
        'data-cms-area': string;
    };
    settings: {};
    render_settings: {
        position: string;
        classes: string;
    };
}

let rawCCTs: RawCCT[] = [];

let customContentTypesViews = {};

export = function CMSadapterComponentGenerator(application) {
    // @class CMSComponent Allows the user to interact with CMS related
    // concepts like enhanced content, landing pages, commerce categories,
    // custom content types, etc.
    // @extends SC.BaseComponent
    const CMSAdapterComponent = SCBaseComponent.extend({
        componentName: 'CMS',

        application: application,

        // @property {CMSadapter.Component.CustomContentTypeStore}
        // _customContentTypes Custom content type store
        // @private
        _customContentTypes: {},

        // @method _createError Internal error to centralize the generation of errors
        // @param {String} error_code Code of the error (Capitalized word)
        // @param {String} error_message Details error message
        // @return {CMSadapter.Component.Error}
        _createError: function _createError(error_code, error_message) {
            // @class CMSadapter.Component.Error
            return {
                // @property {String} code
                title: error_code,
                // @property {String} message
                message: error_message
            };
            // @class CMSadapterComponent
        },

        // @method _installContent Internal method to handle the
        // installation of a CCT (call the install method)
        // @private
        // @param {CustomContentType.Base.View} cct A CCT instance
        // @param {Object} cct_settings Any object to be sent to the cct instance
        // @return {jQuery.Deferred}
        _installContent: function _installContent(cct, cct_settings, context_data) {
            const self = this;
            return jQuery.when(cct.install(cct_settings, context_data)).then(
                function() {
                    return jQuery.Deferred().resolve();
                },
                function(e) {
                    const message =
                        (e && _.isFunction(e.toString) && e.toString()) ||
                        Utils.translate(
                            'Unknown error installing CCT. CCT Instance Id: $(0)',
                            cct.instanceId
                        );
                    return jQuery
                        .Deferred()
                        .reject(self._createError('ERR_INSTALLING_CCT', message));
                }
            );
        },

        // @method _updateSettings Internal method to handle the
        // update of the CCT settings (call the update method)
        // @private
        // @param {CustomContentType.Base.View} cct A CCT instance
        // @param {Object} cct_settings Any object to be sent to the cct instance
        // @return {jQuery.Deferred}
        _updateSettings: function _updateSettings(cct, cct_settings) {
            const self = this;

            return jQuery.when(cct.update(cct_settings)).then(
                function() {
                    return jQuery.Deferred().resolve();
                },
                function(e) {
                    const message =
                        (e && _.isFunction(e.toString) && e.toString()) ||
                        Utils.translate(
                            'Unknown error updating CCT. CCT Instance Id: $(0)',
                            cct.instanceId
                        );
                    return jQuery.Deferred().reject(self._createError('ERR_UPDATING_CCT', message));
                }
            );
        },

        setRawCCTs: function setRawCCTs(ccts: RawCCT[]) {
            rawCCTs = ccts;
        },

        // @method registerCustomContentType Register a new CCT for the running application
        // @public
        // @param {CustomContentType.Base.View} cct Custom Content Type View constructor
        // @return {Void}
        registerCustomContentType: function registerCustomContentType(cct) {
            this._customContentTypes[cct.id.toLowerCase()] = cct;
        },

        // @method addContents Add multiple CCTs.
        // If the CCT was already added, then it just will attach the
        // previous CCT view instance again
        // (that means that new settings or render_settings will be ignored)
        // Otherwise it will create a new CCT and add it to the current view
        // @public
        // @return {jQuery.Deferred}
        addContents: function addContents() {
            const self = this;
            const old_instances = _.keys(customContentTypesViews);
            const new_instances = [];
            const async_operations = [];

            SCBaseComponentChildViewsComponent.resetViewsToRerender();

            const ccts = self._sortCCTs(rawCCTs);

            // Calculate what ccts needs to be preserved and what ccts are new
            _.each(ccts, function(cct: any) {
                const index = _.indexOf(old_instances, cct.instance_id);

                if (index >= 0) {
                    old_instances.splice(index, 1);
                }

                new_instances.push({
                    id: cct.id,
                    instance_id: cct.instance_id,
                    selector: cct.selector,
                    settings: cct.settings,
                    render_settings: cct.render_settings
                });
            });

            // Remove old instances
            if (!this.application.getLayout().getCurrentView().inModal) {
                _.each(old_instances, function(old_instance_id) {
                    async_operations.push(self.removeContent(old_instance_id, true));
                });
            }

            customContentTypesViews = {};

            _.each(new_instances, cct => {
                async_operations.push(
                    this.addContent(
                        cct.id,
                        cct.instance_id,
                        cct.selector,
                        cct.settings,
                        cct.render_settings
                    )
                );
            });

            return jQuery.when.apply(jQuery, async_operations);
        },

        // @method addContent Adds a new CCT into the specified placeholder
        // @public
        // @param {String} cct_id Id of the CCT constructor. This value
        // must have been registered previously
        // @param {String} cct_instance_id. Unique identifier of the new CCT
        // @param {Selector} cct_selector Where the cct should be inserted
        // @param {Object} cct_settings Any setting that will be sent to the new cct instance
        // @param {CMSadapter.Component.addContent.RenderSettings} render_settings
        // Setting on how the rendering should be done
        // @return {jQuery.Deferred}
        addContent: function addContent(
            cctId: string,
            cctInstanceId: string,
            cctSelector,
            cctSettings,
            renderSettings
        ) {
            const selector = SCBaseComponentChildViewsComponent.getPlaceholder(cctSelector);
            const container = selector
                ? SCBaseComponentChildViewsComponent.getPlaceholderViews(
                      this.selectorToString(selector)
                  )
                : null;
            const asyncOperations = [];

            cctId = cctId.toLowerCase();

            if (
                !selector ||
                !container.views ||
                !container.views.length ||
                !this._customContentTypes[cctId]
            ) {
                return jQuery.Deferred().resolve();
            }

            if (!customContentTypesViews[cctInstanceId]) {
                customContentTypesViews[cctInstanceId] = [];
            }

            const cctGenerator = {
                cctId: cctId,
                cctInstanceId: cctInstanceId,
                cctConstructor: this._customContentTypes[cctId].view,
                cctConstructorOptions: this._customContentTypes[cctId].options || {},
                cctContainerConstructor: CustomContentTypeContainerView,
                cctRenderSettings: renderSettings,
                cctSelector: container.selector,
                cctSettings: cctSettings,
                cctErrorContextNotFound: this._createError(
                    'ERR_CONTEXTNOTFOUND_CCT',
                    Utils.translate(`Context for CCT not found. CCT Instance Id: ${cctInstanceId}`)
                )
            };

            _.each(container.views, function(parentViewInstance: any) {
                const cctContainer = parentViewInstance.getChildViewInstance(
                    cctSelector['data-cms-area'],
                    cctInstanceId
                );

                if (!cctContainer) {
                    const generatorConstructor = (
                        parentView,
                        asyncOperations?
                    ): ChildViewGenerator<object, object> => {
                        const childViewConstructor = () => {
                            const cctInstance = new cctGenerator.cctConstructor(
                                _.extend(cctGenerator.cctConstructorOptions, {
                                    id: cctGenerator.cctId,
                                    instanceId: cctGenerator.cctInstanceId
                                })
                            );

                            const cctContainerInstance = new cctGenerator.cctContainerConstructor({
                                innerCustomContentType: cctInstance,
                                instanceId: cctGenerator.cctInstanceId,
                                classes: cctGenerator.cctRenderSettings.classes
                            });

                            const contextData = parentView.getContextData(
                                cctInstance.getContextDataRequest()
                            );

                            if (cctInstance.validateContextDataRequest(contextData)) {
                                const installPromise = cctInstance.install(
                                    cctGenerator.cctSettings,
                                    contextData
                                );

                                if (asyncOperations) {
                                    asyncOperations.push(installPromise);
                                }

                                cctContainerInstance.parentView = parentView;
                                cctContainerInstance.hasParent = true;

                                return cctContainerInstance;
                            } else if (asyncOperations) {
                                asyncOperations.push(cctGenerator.cctErrorContextNotFound);
                            }
                        };

                        return {
                            childViewConstructor: childViewConstructor,
                            childViewInstance: childViewConstructor(),
                            childViewIndex:
                                1000 + parseInt(cctGenerator.cctRenderSettings.position, 10),
                            childViewSelector: cctGenerator.cctSelector,
                            childViewIsExternal: true
                        };
                    };

                    const childViewInstancesGenerator = {};
                    childViewInstancesGenerator[`cms:${cctSelector['data-cms-area']}`] = {};
                    childViewInstancesGenerator[`cms:${cctSelector['data-cms-area']}`][
                        cctInstanceId
                    ] = generatorConstructor;

                    const generator = generatorConstructor(parentViewInstance, asyncOperations);

                    const childViewInstances = {};
                    childViewInstances[`cms:${cctSelector['data-cms-area']}`] = {};
                    childViewInstances[`cms:${cctSelector['data-cms-area']}`][
                        cctInstanceId
                    ] = generator;

                    if (generator.childViewInstance) {
                        const cctInstance = generator.childViewInstance.getChildViewInstance(
                            'CCT-View'
                        );

                        if (cctInstance) {
                            customContentTypesViews[cctInstanceId].push(
                                // @class CMSadapter.Component.CustomerContentTypeInstance.Container
                                {
                                    // @property {CustomContentType.Base.View} cct
                                    // Instance of the inner CCT
                                    cct: cctInstance,
                                    // @property {Backbone.View} parent SCA View
                                    // that will contain the new CCT
                                    // ,	parent: parent_view_instance
                                    // @property {CustomContentType.Container.View} cct_container_instance
                                    // Instance of the View that contains/wrap the CCT instance
                                    container: generator.childViewInstance,
                                    // @property {String} selector Where the new
                                    // CCT will be injected
                                    selector: container.selector,
                                    // @property {CMSadapter.Component.addContent.RenderSettings} render_settings
                                    // Setting on how the rendering should be done
                                    render_settings: renderSettings
                                }
                            );
                        }
                    }

                    parentViewInstance.addChildViewInstances(childViewInstances, true);

                    SCBaseComponentChildViewsComponent.addViewsToRerender(
                        parentViewInstance,
                        childViewInstancesGenerator
                    );
                } else {
                    customContentTypesViews[cctInstanceId].push(
                        // @class CMSadapter.Component.CustomerContentTypeInstance.Container
                        {
                            // @property {CustomContentType.Base.View} cct Instance of the inner CCT
                            cct: cctContainer.getChildViewInstance('CCT-View'),
                            // @property {Backbone.View} parent SCA View that will contain the new CCT
                            // ,	parent: parent_view_instance
                            // @property {CustomContentType.Container.View} cct_container_instance Instance of the View that contains/wrap the CCT instance
                            container: cctContainer,
                            // @property {String} selector Where the new CCT will be injected
                            selector: container.selector,
                            // @property {CMSadapter.Component.addContent.RenderSettings} render_settings Setting on how the rendering should be done
                            render_settings: renderSettings
                        }
                    );
                }
            });

            return jQuery.when.apply(jQuery, asyncOperations);
        },

        // @method updateContent Updates a CCT settings and
        // its render settings
        // @public
        // @param {String} cct_id Id of the CCT constructor.
        // This value must have been registered previously
        // @param {String} cct_instance_id. Unique identifier
        // of the new CCT
        // @param {Selector} cct_selector Where the cct should be inserted
        // @param {Object} cct_settings Any setting that will be sent to the new cct instance
        // @param {CMSadapter.Component.addContent.RenderSettings} render_settings
        // Setting on how the rendering should be done
        // @return {jQuery.Deferred}
        updateContent: function updateContent(
            cct_instance_id,
            cct_selector,
            cct_settings,
            render_settings
        ) {
            const self = this;
            const cct_views_container = customContentTypesViews[cct_instance_id];
            const selector = SCBaseComponentChildViewsComponent.getPlaceholder(cct_selector);
            const async_operations = [];

            if (cct_views_container) {
                const first_cct_container = cct_views_container[0];

                if (!_.isEqual(first_cct_container.selector, cct_selector)) {
                    if (!selector) {
                        return jQuery
                            .Deferred()
                            .reject(
                                self._createError(
                                    'ERR_INVALID_SELECTOR',
                                    Utils.translate(
                                        'Invalid selector. The current view does not contains the specified selector: $(0)',
                                        self.selectorToString(cct_selector)
                                    )
                                )
                            );
                    }
                    const cct_id = first_cct_container.cct.id;
                    self.removeContent(cct_instance_id, true);

                    return self.addContent(
                        cct_id,
                        cct_instance_id,
                        cct_selector,
                        cct_settings,
                        render_settings
                    );
                }
                _.each(cct_views_container, function(cct_container: any) {
                    const cct_container_instance = cct_container.container;
                    const parent_view_instance = cct_container_instance.parentView;

                    async_operations.push(self._updateSettings(cct_container.cct, cct_settings));

                    if (!_.isEqual(first_cct_container.render_settings, render_settings)) {
                        const generator = {};
                        const container_name = cct_container.selector['data-cms-area'];

                        generator[container_name] = {};
                        generator[container_name][cct_instance_id] = {
                            childViewIndex: 1000 + parseInt(render_settings.position, 10),
                            childViewConstructor: null,
                            childViewInstance: cct_container_instance,
                            childViewSelector: cct_container.selector,
                            childViewIsExternal: true
                        };

                        parent_view_instance.updateChildViewInstances(generator, true);

                        cct_container.render_settings = render_settings;
                    } else {
                        cct_container.cct.render();
                    }
                });

                return jQuery.when.apply(jQuery, async_operations);
            }

            return jQuery
                .Deferred()
                .reject(
                    self._createError(
                        'ERR_INVALID_INSTANCE_ID',
                        Utils.translate('Invalid content type instance id: $(0)', cct_instance_id)
                    )
                );
        },

        // @method _sortCCTs Internal method to sort a list of cct to be rendered
        // @param {Array<CustomContentType.Base.View>} ccts List of ccts to be sorted
        // @private
        // @return {Array<CustomContentType.Base.View>}
        _sortCCTs: function _sortCCTs(ccts) {
            const self = this;

            // sort first by placeholder and then by position
            ccts.sort(function(cct_a, cct_b) {
                const cct_a_selector = SCBaseComponentChildViewsComponent.getPlaceholder(
                    cct_a.selector
                );
                const cct_b_selector = SCBaseComponentChildViewsComponent.getPlaceholder(
                    cct_b.selector
                );

                const cct_a_key = cct_a_selector ? self.selectorToString(cct_a_selector) : '';
                const cct_b_key = cct_b_selector ? self.selectorToString(cct_b_selector) : '';

                if (cct_a_key === cct_b_key) {
                    return (
                        parseInt(cct_a.render_settings.position, 10) -
                        parseInt(cct_b.render_settings.position, 10)
                    );
                }
                return cct_a_key < cct_b_key ? 1 : 0;
            });

            return ccts;
        },

        // @method removeContent Removes a CCT from its location
        // @public
        // @param {String} cct_instance_id Unique CCT identifier
        // @param {Boolean} skip_destroy_call Indicate if should destroy the instance or not
        // @return {jQuery.Deferred}
        removeContent: function removeContent(cctInstanceId: string, destroyCall: boolean) {
            const views = customContentTypesViews[cctInstanceId];
            const async_operations = [];

            if (views) {
                _.each(views, function(cctGenerator: any) {
                    async_operations.push(
                        cctGenerator.container.parentView.removeChildViewInstance(
                            cctGenerator.selector['data-cms-area'],
                            cctGenerator.cct.instanceId,
                            destroyCall
                        )
                    );
                });

                if (destroyCall) {
                    delete customContentTypesViews[cctInstanceId];
                }

                return jQuery.when.apply(jQuery, async_operations);
            }

            return jQuery
                .Deferred()
                .reject(
                    this._createError(
                        'ERR_INVALID_INSTANCE_ID',
                        Utils.translate(
                            'The specified instance id is not registered. Instance Id: $(0)',
                            cctInstanceId
                        )
                    )
                );
        },

        getContentIds: function getContentIds() {
            return _.keys(this._customContentTypes);
        },

        // @method selectorToString returns the string key for a json selector
        // @param {Selector} placeholder
        // @return {String} the string key for a json selector
        selectorToString: function selectorToString(placeholder) {
            let str = '';

            _.each(placeholder, function(value, key) {
                str += '[' + key + '="' + value + '"]';
            });

            return str;
        }
    });

    return CMSAdapterComponent;
};

// @class Selector an obj with the form
// { data-cms-attr1: "placeholder1", data-cms-attr2: "placeholder2" }
// @class PlaceholderViews an obj with the form
// { "selector_key": selector: {Selector}, views: Array<Backbone.View>}

// @class CMSadapter.Component.CustomContentTypeStore
// A dictionary by custom content type id of all CCTs register for the running application
// @extend Dictionary<String, CustomContentType.Base.View>

// @class CMSadapter.Component.CustomerContentTypeInstance.Store
// A dictionary to store the generated CCT instances
// @extend Dictionary<String, CMSadapter.Component.CustomerContentTypeInstance.Container>

// @class CMSadapter.Component.addContent.RenderSettings
// @property {Number} position Indicate where the CCT should be inserted
