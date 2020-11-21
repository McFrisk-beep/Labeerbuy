/* jshint node: true */
/* jshint esversion: 6 */

/*
@module gulp.ssp-libraries

This gulp task will compile the project's backend's JavaScript output file. In the distro.json the ssp-libraries section contains
a reference a list of all back-end models used to generate the back-end entry point

#Usage

	gulp ssp-libraries

##Declaring ssp-libraries in ns.package.json

The javascript files that are able to be compiled are those referenced by the property gulp.ssp-libraries
in module's ns.package.json file. Example:

	{
		"gulp": {
			...
		,	"ssp-libraries": [
				"SuiteScript/*.js"
			]
		}
	}
*/

const fs = require('fs');
const gulp = require('gulp');
const _ = require('underscore');
const map = require('map-stream');
const async = require('async');
const amdOptimize = require('gulp-requirejs-optimize');
const shell = require('shelljs');
const path = require('path');
const File = require('vinyl');
const chmod = require('gulp-chmod');
const through = require('through');
const glob = require('glob').sync;
const package_manager = require('../package-manager');


require('./configuration');

const isSCIS = !package_manager.distro.isSCA && !package_manager.distro.isSCLite;

// @function addRequireToFile Adds require.js (almond) configuration and release metadata into the final file
// @param {File} file
// @param {Object} config
// @param {Function<Error, File>} cb
// @return {Void}
function addRequireToFile(file, config, cb) {
    package_manager.getReleaseMetadata(function(err, metadata) {
        if (err) {
            return cb(err);
        }

        const require_file_path = package_manager.getGlobsForModule('almond', 'ssp-libraries')[0];
        let result = '';

        result += '__sc_ssplibraries_t0 = new Date().getTime(); \n';
        result += `window.suiteLogs = window.suiteLogs || ${!!~process.argv.indexOf(
            '--suitelogs'
        )}; \n`;

        // output metadata as a global variable
        if (metadata) {
            if (_.contains(process.argv, 'deploy') && !package_manager.distro.isSCA) {
                metadata.name = `${metadata.name} - development`;
                metadata.version = `${metadata.version}-dev`;
            }
            result += `release_metadata = ${JSON.stringify(metadata)}\n`;
        }

        result += `${fs.readFileSync(require_file_path, { encoding: 'utf8' }).toString()}\n`;
        result += `${file.contents.toString()}\n`;
        result += `require.config(${JSON.stringify(config.amdConfig)});\n`;

        file.contents = Buffer.from(result);
        cb(null, file);
    });
}

// generates a bootstrapper script that requires the starter script using require.js
function generateEntryPointContent(config) {
    const inv_path = _.invert(config.amdConfig.paths);
    const paths = {};

    const onFile = function(file) {
        const normalized_path = path.resolve(file.path);
        const moduleName = path.basename(normalized_path, '.js');
        const relativePath = normalized_path.replace(/\\/g, '/').replace(/\.js$/, '');

        // patch, configuration in scis is coming from both modules SspLibraries and
        // PosApplication, we need that it comes from PosApplication
        if (!isSCIS || moduleName !== 'Configuration' || relativePath.includes('PosApplication')) {
            if (paths[moduleName]) {
                throw new Error(
                    `${moduleName} is defined twice:\n${
                        paths[moduleName]
                    }\n${relativePath}.\nDefine an override or remove one of the troubled modules`
                );
            }
            paths[moduleName] = relativePath;

            config.amdConfig.paths[inv_path[moduleName] || moduleName] = relativePath;
        }

        config.amdConfig.rawText[relativePath] = file.contents.toString();
    };

    const onEnd = function() {
        const start_point = `define('${config.entryPoint}', ['${config.dependencies.join(
            "', '"
        )}'], function (){});`;

        config.amdConfig.rawText[config.entryPoint] = start_point;

        const file = new File({
            path: config.entryPoint,
            contents: Buffer.from('')
        });

        this.emit('data', file);
        this.emit('end');
    };

    return through(onFile, onEnd);
}

// @function generateLibrariesForConfig Generate a combined output with all require backend files for a particular configuration
// @param {Object} config
// @param {Function<Error, File>} cb
// @return {Void}
function generateLibrariesForConfig(config, cb) {
    const ts = require('gulp-typescript');
    const configRequire = JSON.parse(JSON.stringify(config));

    config = JSON.parse(JSON.stringify(config));
    config.amdConfig.paths = config.amdConfig.paths || {};
    config.amdConfig.rawText = config.amdConfig.rawText || {};
    config.amdConfig.optimize = 'none';

    const configurationManifestDefaultsPath = path.join(
        process.gulp_dest,
        'configurationManifestDefaults.json'
    );

    gulp.src(package_manager.getGlobsFor('ssp-libraries'), { allowEmpty: true })
        .pipe(package_manager.handleOverrides())
        .pipe(
            ts({
                module: 'amd',
                target: 'es5',
                allowJs: true,
                experimentalDecorators: true,
                types: []
            })
        )
        .pipe(generateEntryPointContent(config))
        .pipe(amdOptimize(config.amdConfig))
        .pipe(
            map(function(file, cb) {
                let product;
                if (package_manager.distro.isSCA) {
                    product = '"SCA"';
                } else if (package_manager.distro.isSCLite) {
                    product = '"SCS"';
                } else {
                    product = '"SCIS"';
                }

                let text = `BuildTimeInf={isSCLite: ${
                    package_manager.distro.isSCLite
                }, product: ${product}}\n`;

                if (!package_manager.getTaskConfig('configuration.ignore', false)) {
                    text += `ConfigurationManifestDefaults = ${shell.cat(
                        configurationManifestDefaultsPath
                    )};\n`;
                }
                file.contents = Buffer.from(`${file.contents.toString()}\n${text}`);

                file.path = config.exportFile;
                cb(null, file);
            })
        )
        .pipe(
            map(function(file, cb) {
                addRequireToFile(file, configRequire, cb);
            })
        )
        .on('error', cb)
        .pipe(chmod(0o666))
        .pipe(gulp.dest(process.gulp_dest, { mode: '0777' }))
        .on('end', function(err) {
            shell.rm('-f', configurationManifestDefaultsPath);
            cb(err);
        });
}

// Calculates how many css files did bless generate for each of the relevant ssps
// And then injects that amount in the ssp template using cssnumbers parameter
function cssNumbersForFile(file) {
    const glob = require('glob');
    let files = [];

    if (file === 'shopping') {
        files = glob.sync(
            path.join(package_manager.getNonManageResourcesPath(), 'css_ie/shopping*.css')
        );
    } else if (file === 'my_account') {
        files = glob.sync(
            path.join(package_manager.getNonManageResourcesPath(), 'css_ie/myaccount*.css')
        );
    } else if (file === 'checkout') {
        files = glob.sync(
            path.join(package_manager.getNonManageResourcesPath(), 'css_ie/checkout*.css')
        );
    }

    return files.length;
}

function addIeCssFiles() {
    if (process.is_SCA_devTools || isSCIS) {
        return '';
    }

    let app_includes = '\n';
    const ie_css = {
        shopping: cssNumbersForFile('shopping'),
        myaccount: cssNumbersForFile('my_account'),
        checkout: cssNumbersForFile('checkout')
    };

    _.each(ie_css, function(css_count, app) {
        app_includes += `app_includes.${app}.ie = `;

        const ie_files = [];
        for (let i = 0; i < css_count; i++) {
            const ie_file = `css_ie/${app}${i ? `_${i}` : ''}.css`;

            ie_files.push(ie_file);
        }

        app_includes += `${JSON.stringify(ie_files)};\n`;
    });

    app_includes += '\n_.each(app_includes, function(app){\n';

    app_includes += '\tapp.ie = _.map(app.ie, function(file){\n';
    app_includes += '\t\treturn Application.getNonManageResourcesPathPrefix() + file;\n';
    app_includes += '\t});\n';

    app_includes += '});\n';

    return app_includes;
}

gulp.task('ssp-libraries-no-dep', function(cb) {
    let configs = package_manager.getTaskConfig('ssp-libraries', []);

    configs = _.isArray(configs) ? configs : [configs];

    async.each(configs, generateLibrariesForConfig, cb);
});

gulp.task('ssp-libraries-ext', function(cb) {
    gulp.src(package_manager.getGlobsFor('ssp-libraries-ext'), { allowEmpty: true })
        .pipe(
            map(function(file, cb) {
                const app_manifest_string = `var app_manifest = ${JSON.stringify(
                    { ...package_manager.distro.app_manifest, ...{ version: undefined } } || {},
                    null,
                    '\t'
                )};\n\n`;
                // for backward compatibility SCS will always require as SCA
                const scs_patch =
                    'if(app_manifest.type === "SCS") {\n' + "\trequire('SCA');\n } else {\n";

                let coreLanguages = glob(
                    path.join(package_manager.getNonManageResourcesPath(), 'languages', '*.js')
                );

                const coreLanguagesBasenames = [];
                _.map(coreLanguages, coreLanguage => {
                    coreLanguagesBasenames.push(path.basename(coreLanguage, '.js'));
                });
                const coreLanguagesByApp = {};
                _.each(coreLanguagesBasenames, function(coreLanguageBasename) {
                    let [app, ...language] = coreLanguageBasename.split('_');
                    app = app.replace('scis', 'instore');
                    language = language.join('_');
                    coreLanguagesByApp[app] = coreLanguagesByApp[app] || [];
                    coreLanguagesByApp[app].push(`${language}`);
                });

                const core_languages_string = `\nvar coreLanguages = ${JSON.stringify(
                    coreLanguagesByApp
                )}\n`;
                const require_string = `${app_manifest_string}
                ${core_languages_string}${scs_patch}\trequire(app_manifest.type);\n}\n`;
                file.contents = Buffer.from(
                    require_string + file.contents.toString() + addIeCssFiles()
                );
                cb(null, file);
            })
        )
        .pipe(chmod(0o666))
        .pipe(gulp.dest(process.gulp_dest, { mode: '0777' }))
        .on('end', cb);
});

const deps = ['languages'];
if (!process.is_SCA_devTools) {
    deps.push('sass');
}

gulp.task(
    'ssp-libraries',
    gulp.parallel(
        gulp.series(deps, 'ssp-libraries-ext'),
        gulp.series('configuration', 'ssp-libraries-no-dep')
    )
);
