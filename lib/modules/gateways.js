'use strict';

var util = require('../util'),
	Gateways = module.exports;

/**
 * Lists all available gateway types on the Spreedly API
 *
 * @class Spreedly
 * @module Gateways
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with the list of abstract gateway elements
 */
Gateways.listAvailableGateways = function listAvailableGateways(cb) {
	return this._doRequest({
		url: 'gateways_options.json'
	})
	.then(util.extractRoot())
	.nodeify(cb);
};

/**
 * Creates and retains a gateway in your environment
 *
 * @class Spreedly
 * @module Gateways
 * @param {String} gatewayType One of the specified types of gateways to create
 * @param {Object} [credentials] Key/Value object of gateway credentials, depending on gateway type
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with the created gateway element
 */
Gateways.createGateway = function createGateway(gatewayType, credentials, cb) {
	credentials = credentials || {};

	if(typeof credentials === 'function') {
		cb = credentials;
		credentials = {};
	}

	return this._doRequest({
		url: 'gateways.json',
		method: 'post',
		body: util.preparePost('gateway', credentials, { gatewayType: gatewayType })
	})
		.then(util.extractRoot())
		.nodeify(cb);
};

/**
 * Lists all gateways that have been provisioned in your Spreedly environment
 *
 * @class Spreedly
 * @module Gateways
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with an array of gateway elements
 */
Gateways.listGateways = function listGateways(cb) {
	return this._doRequest({
		url: 'gateways.json'
	})
		.then(util.extractRoot())
		.nodeify(cb);
};

/**
 * Updates credentials for a gateway. If the gateway was redacted, it will be set back to retained.
 *
 * @class Spreedly
 * @module Gateways
 * @param {String|Object} gatewayToken A gateway token, or a gateway element containing a token of the gateway to update
 * @param {Object} [credentials] Key/Value object of updated gateway credentials, depending on gateway type
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with the updated gateway element
 */
Gateways.updateGateway = function updateGateway(gatewayToken, credentials, cb) {
	// Allow caller to pass in gateway objects
	gatewayToken = gatewayToken.token || gatewayToken;

	var postData =  util.preparePost('gateway', credentials);
	return this._doRequest({
		url: 'gateways/' + gatewayToken + '.json',
		method: 'put',
		body: postData
	})
		.then(util.extractRoot())
		.nodeify(cb);
};

/**
 * Redact a gateway
 *
 * @class Spreedly
 * @module Gateways
 * @param {String|Object} gatewayToken A gateway token, or a gateway element containing a token of the gateway to redact
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with a transaction element
 */
Gateways.redactGateway = function redactGateway(gatewayToken, cb) {
	// Allow caller to pass in gateway objects
	gatewayToken = gatewayToken.token || gatewayToken;

	return this._doRequest({
		url: 'gateways/' + gatewayToken + '/redact.json',
		method: 'put'
	})
		.then(util.extractRoot())
		.nodeify(cb);
};

/**
 * Retrieves a full gateway element and details about a gateway, based on the token.
 *
 * @class Spreedly
 * @module Gateways
 * @param {String|Object} gatewayToken A gateway token, or a gateway element containing a token of the gateway
 * @param {Function} [cb] A Node.js-style callback
 * @returns {Promise} Bluebird promise that is resolved with the gateway element
 */
Gateways.showGateway = function showGateway(gatewayToken, cb) {
	// Allow caller to pass in gateway objects
	gatewayToken = gatewayToken.token || gatewayToken;

	return this._doRequest({
		url: 'gateways/' + gatewayToken + '.json'
	})
		.then(util.extractRoot())
		.nodeify(cb);
};