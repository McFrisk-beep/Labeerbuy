/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="MyAccount.Full"/>

import '../../../Commons/Utilities/JavaScript/backbone.custom';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.Model';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.Sync';
import '../../../Commons/Core/JavaScript/backbone/BackboneExtras';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.View';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.View.render';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.View.saveForm';
import '../../../Commons/BackboneExtras/JavaScript/Backbone.View.toggleReset';
import '../../../Commons/BootstrapExtras/JavaScript/Bootstrap.Rate';
import '../../../Commons/BootstrapExtras/JavaScript/Bootstrap.Slider';
import '../../../Commons/NativesExtras/JavaScript/String.format';
import { jQuery } from '../../jQuerySCAExtras/JavaScript/jQuerySCAExtras';
import { MyAccountLayout } from './SC.MyAccount.Layout';
import { ApplicationOnline } from '../../SCA/JavaScript/ApplicationOnline';

import Configuration = require('../../MyAccountApplication.SCA/JavaScript/SC.MyAccount.Configuration');

export class MyAccountFull extends ApplicationOnline {
    protected static instance: MyAccountFull;
    protected static readonly internalName: string = 'MyAccount.Full';

    public static getName(): string {
        return MyAccountFull.internalName;
    }

    protected constructor() {
        super();
        this.configuration = Configuration.get();
        // This is only to avoid break extensions in 20.2 release. Should be deleted asap
        this.Configuration = this.configuration;
        this.layout = new MyAccountLayout(this);

        jQuery.ajaxSetup({ cache: false });
    }

    public static getInstance(): MyAccountFull {
        this.instance = this.instance || new MyAccountFull();
        return this.instance;
    }

    public start(modules: any[], done?: Function): void {
        const modulesToLoad = this.modulesToLoad(modules);
        super.start(modulesToLoad, done);
    }

    protected modulesToLoad(entryPointModules: any[]): any[] {
        return entryPointModules;
    }

    public getName(): string {
        return 'MyAccount';
    }
}
