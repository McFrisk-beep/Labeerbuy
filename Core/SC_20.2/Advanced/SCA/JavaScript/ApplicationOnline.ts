/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name = "ApplicationOnline"/>

import { Application } from '../../../Commons/ApplicationSkeleton/JavaScript/Application';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import { jQuery } from '../../jQuerySCAExtras/JavaScript/jQuerySCAExtras';
import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';

export abstract class ApplicationOnline extends Application {
    public resizeImage(url: string, size: string): any {
        url =
            url ||
            Utils.getThemeAbsoluteUrlOfNonManagedResources(
                'img/no_image_available.jpeg',
                this.getConfig().imageNotAvailable
            );

        const configuration = this.getConfig();
        const sizeMapping = configuration.imageSizeMapping || {};
        const mappedSize = sizeMapping.size || size;

        const siteSettings = configuration.siteSettings || {};
        return Utils.resizeImage(siteSettings.imagesizes || [], url, mappedSize);
    }

    public getUser(): JQuery.Deferred<any> {
        const profilePromise = jQuery.Deferred();

        ProfileModel.getPromise()
            .done(function() {
                profilePromise.resolve(ProfileModel.getInstance());
            })
            .fail(function(...args) {
                profilePromise.reject.apply(this, args);
            });

        return profilePromise;
    }

    public isStandalone(): boolean {
        return false;
    }

    public abstract getName(): string;
}
