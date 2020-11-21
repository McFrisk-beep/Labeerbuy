/* jshint esversion: 9 */
const crypto = require('crypto');
const urlModule = require('url');
const express = require('express');
const util = require('util');
const querystring = require('querystring');
const https = require('https');
const { exec } = require('child_process');

const port = '7777';
const service = 'tba';

const defaultUrls = {
    step1: 'rest.netsuite.com/rest/requesttoken',
    step2: 'https://system.netsuite.com/app/login/secure/authorizetoken.nl?oauth_token=',
    step3: '.restlets.api.netsuite.com/rest/accesstoken'
};

const CONSUMER_KEY = 'df16f2f6b6d9559b128da693c304338977ae1fe56a08dbeb617541cdde26172b';
const CONSUMER_SECRET = '6c8ba96debebf3b78c5eab1249a2db5eed0a88313b660879f3ea78513b51c15e';
const callback = `http://localhost:${port}/${service}`;

function openBrowser(url) {
    let command = 'xdg-open';
    if (process.platform === 'darwin') {
        command = 'open';
    } else if (process.platform === 'win32') {
        command = 'start';
    }

    exec(`${command} ${url}`).on('error', error => {
        throw error;
    });
}

const callService = util.promisify(function(options, cb) {
    const serviceUrl = urlModule.format({
        protocol: options.protocol,
        hostname: options.hostname,
        pathname: options.pathname || '',
        query: options.query || {}
    });

    const method = options.method || 'GET';
    const parseResponse = options.parseResponse !== undefined ? options.parseResponse : true;

    let output = '';

    if (options.ignoreCert) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    }
    const req = https
        .request(serviceUrl, { headers: options.headers, method: method }, res => {
            res.setEncoding('utf8');

            res.on('data', chunk => {
                output += chunk;
            });

            res.on('end', () => {
                output = parseResponse ? JSON.parse(output) : output;
                cb(null, output);
            });
        })
        .on('error', cb);

    if (['GET', 'DELETE'].indexOf(method) < 0 && options.data) {
        req.write(options.data || {});
    }
    req.end();
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
});

class OAuth1 {
    constructor() {
        this.consumer = { key: CONSUMER_KEY, secret: CONSUMER_SECRET };
        this.version = '1.0';
        this.signatureMethod = 'HMAC-SHA256';
    }

    startLocalServer() {
        const promise = new Promise(resolve => {
            const app = express();
            let server;
            app.use(`/${service}`, (req, res) => {
                res.send('Done!');
                resolve(req.query);
                server.close();
            });
            server = app.listen(port, '0.0.0.0');
        });
        return promise;
    }

    getParameterString(oauthHeaders, request) {
        const { url, data = {} } = request;
        const searchParams = new URL(url).searchParams.entries();
        const params = this.sortObject({
            ...oauthHeaders,
            ...data,
            ...Object.fromEntries(searchParams)
        });

        const paramsString = params
            .map(param => {
                return `${param.name}=${param.value}`;
            })
            .join('&');

        return paramsString;
    }

    getBaseString(oauthHeaders, request) {
        const { method, url } = request;
        const [baseUrl] = url.split('?');
        const baseString = [
            method.toUpperCase(),
            this.encode(baseUrl.toLowerCase()),
            this.encode(this.getParameterString(oauthHeaders, request))
        ].join('&');
        return baseString;
    }

    getSigningKey(secret = '') {
        const signingKey = [this.encode(this.consumer.secret), this.encode(secret)].join('&');
        return signingKey;
    }

    getSignature(oauthHeaders, request, secret) {
        const key = this.getSigningKey(secret);
        const hash = crypto.createHmac('sha256', key);
        hash.update(this.getBaseString(oauthHeaders, request));
        return hash.digest('base64');
    }

    encode(data) {
        return encodeURIComponent(data)
            .replace(/!/g, '%21')
            .replace(/\*/g, '%2A')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29');
    }

    sortObject(headers) {
        const keys = Object.keys(headers).sort();
        return keys.map(name => {
            return { name: this.encode(name), value: this.encode(headers[name]) };
        });
    }

    getAuthHeader(request, token = {}) {
        const HEADER = 'OAuth';
        const oauthHeaders = {
            oauth_consumer_key: this.consumer.key,
            oauth_timestamp: parseInt(new Date().getTime() / 1000, 10),
            oauth_nonce: crypto.randomBytes(10).toString('hex'),
            oauth_version: this.version,
            oauth_signature_method: this.signatureMethod
        };
        if (token.token) {
            oauthHeaders.oauth_token = token.token;
        }
        if (token.callback) {
            oauthHeaders.oauth_callback = token.callback;
        }
        if (token.verifier) {
            oauthHeaders.oauth_verifier = token.verifier;
        }

        const { account } = request;
        if (account) {
            delete request.account;
        }
        oauthHeaders.oauth_signature = this.getSignature(oauthHeaders, request, token.secret);

        const sortedHeaders = this.sortObject(oauthHeaders);

        if (account) {
            sortedHeaders.push({ name: 'realm', value: account });
        }
        const headerString = sortedHeaders
            .map(header => {
                return `${header.name}="${header.value}"`;
            })
            .join(', ');

        return `${HEADER} ${headerString}`;
    }

    async baseStep(restMethod, params) {
        const request = {
            protocol: 'https',
            hostname: restMethod,
            method: 'POST',
            headers: {},
            parseResponse: false
        };
        if (params.account) {
            request.account = params.account;
        }
        request.url = urlModule.format({
            protocol: request.protocol,
            hostname: request.hostname
        });
        request.headers.Authorization = this.getAuthHeader(request, params);

        const response = await callService(request);
        const { oauth_token: token, oauth_token_secret: secret } = querystring.parse(
            response.trim()
        );
        return { token, secret };
    }

    async step1() {
        return this.baseStep(defaultUrls.step1, { callback });
    }

    step2(key) {
        const promise = this.startLocalServer();
        const loginUrl = defaultUrls.step2 + key;
        openBrowser(loginUrl);

        return promise;
    }

    async step3(account, token, verifier, secret) {
        const params = { account, token, verifier, secret };
        return this.baseStep(account + defaultUrls.step3, params);
    }

    async authorize(request, authToken) {
        if (!authToken) {
            const { token, secret } = await this.step1();
            const { company, oauth_token, oauth_verifier } = await this.step2(token);
            authToken = await this.step3(company, oauth_token, oauth_verifier, secret);
        }
        return this.getAuthHeader(request, authToken);
    }
}

module.exports = OAuth1;
