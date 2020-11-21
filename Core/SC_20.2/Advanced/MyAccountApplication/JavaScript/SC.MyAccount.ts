/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="SC.MyAccount"/>

import { Environment } from '../../../Commons/Core/JavaScript/Environment';
import { MyAccountAlone } from './MyAccount.Alone';
import { MyAccountFull } from './MyAccount.Full';

export class SCMyAccount {
    public static getInstance(): MyAccountFull {
        const SC = Environment.getSC();
        if (SC.ENVIRONMENT.standalone) {
            return MyAccountAlone.getInstance();
        }
        return MyAccountFull.getInstance();
    }
}
