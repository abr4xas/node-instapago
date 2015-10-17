'use strict';

var callInstapago = require('./lib/call-instapago');

function Instapago(keyId, publicKeyId) {
	if ((!keyId || typeof keyId !== 'string') || (!publicKeyId || typeof publicKeyId !== 'string')) {
		throw new Error('Ambos parámetros deben ser un String.');
	}

	this._paymentEndpoint = 'payment';
	this._completeEndpoint = 'complete';
	this._publicKeyId = publicKeyId;
	this._keyId = keyId;
	this._keys = {
		key_id: this._keyId,
		public_key_id: this._publicKeyId
	};
}

function process(keys, options, config, callback) {
	if (!config || typeof config !== 'object') {
		throw new Error('El primer parámetro debe ser un Objecto.');
	} else if (!callback || typeof callback !== 'function') {
		throw new Error('El segundo parámetro debe ser una Función.');
	}

	config.key_id = keys.key_id;
	config.public_key_id = keys.public_key_id;
	config.endpoint = options.endpoint;
	config.method = options.method;
	
	callInstapago(config, function(err, response) {
		if (err) {
			return callback(err);
		}

		return callback(null, response);
	});
}

Instapago.prototype.pay = function(config, callback) {
	var options = {
		endpoint: this._paymentEndpoint,
		method: 'POST'
	};

	process(this._keys, options, config, callback);
}

Instapago.prototype.continuePayment = function(config, callback) {
	var options = {
		endpoint: this._completeEndpoint,
		method: 'POST'
	};

	process(this._keys, options, config, callback);
}

Instapago.prototype.cancelPayment = function(config, callback) {
	var options = {
		endpoint: this._paymentEndpoint,
		method: 'DELETE'
	};

	process(this._keys, options, config, callback);
}

Instapago.prototype.paymentInfo = function(config, callback) {
	var options = {
		endpoint: this._paymentEndpoint,
		method: 'GET'
	};

	process(this._keys, options, config, callback);
}

module.exports = Instapago;
