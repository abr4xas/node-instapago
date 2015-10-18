'use strict';

var callInstapago = require('./lib/call-instapago');

function Instapago(keyId, publicKeyId) {
	if (!keyId || !publicKeyId) {
		var message = 'Los parámetros "keyId" y "publicKeyId" son requeridos para procesar la petición.';
		throw new Error(message);
	} else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
		var message = 'Los parámetros "keyId" y "publicKeyId" deben ser String.';
		throw new Error(message);
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

function check(obj, callback) {
    var requiredParams = [
        'amount', 
        'description', 
        'card_holder', 
        'card_holder_id', 
        'card_number', 
        'cvc', 
        'expiration_date', 
        'status_id', 
        'ip'
    ];
    var missedParam;

    requiredParams.some(function(param) {
        if (!obj.hasOwnProperty(param)) {
            missedParam = param;
            return true;
        }

        return false;
    });

    return callback(missedParam);
}

Instapago.prototype.pay = function(config, callback) {
	var _this = this;
	var options = {
		endpoint: _this._paymentEndpoint,
		method: 'POST'
	};

	check(config, function(param) {
        if (param) {
            var err = new Error('El parámetro "' + param + '" es requerido para procesar la petición.');
            return callback(err);
        }

        process(_this._keys, options, config, callback);
    });
}

Instapago.prototype.continuePayment = function(config, callback) {
	var options = {
		endpoint: this._completeEndpoint,
		method: 'POST'
	};

	if (config && (!config.id || !config.amount)) {
		var err = new Error('Los parámetros "id" y "amount" son requeridos para procesar la petición.');
		return callback(err);
	};

	process(this._keys, options, config, callback);
}

Instapago.prototype.cancelPayment = function(config, callback) {
	var options = {
		endpoint: this._paymentEndpoint,
		method: 'DELETE'
	};

	if (config && !config.id) {
		var err = new Error('El parámetro "id" es requerido para procesar la petición.');
		return callback(err);
	};

	process(this._keys, options, config, callback);
}

Instapago.prototype.paymentInfo = function(config, callback) {
	var options = {
		endpoint: this._paymentEndpoint,
		method: 'GET'
	};

	if (config && !config.id) {
		var err = new Error('El parámetro "id" es requerido para procesar la petición.');
		return callback(err);
	};

	process(this._keys, options, config, callback);
}

module.exports = Instapago;
