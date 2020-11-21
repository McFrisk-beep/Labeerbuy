/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="MyAccount.Alone"/>

import * as _ from 'underscore';
import { MyAccountFull } from './MyAccount.Full';

export class MyAccountAlone extends MyAccountFull {
    protected static instance: MyAccountAlone;

    /**
     * @deprecated
     */
    protected static readonly internalName: string = 'MyAccount.Alone';

    /**
     * @deprecated
     */
    public static getName(): string {
        return MyAccountAlone.internalName;
    }

    private constructor() {
        super();
    }

    public static getInstance(): MyAccountAlone {
        this.instance = this.instance || new MyAccountAlone();
        return this.instance;
    }

    public isStandalone(): boolean {
        return true;
    }

    protected modulesToLoad(entryPointModules: any[]): any[] {
        return _.filter(
            entryPointModules,
            (module: any): boolean => module && !module.excludeFromMyAccount
        );
    }
}
