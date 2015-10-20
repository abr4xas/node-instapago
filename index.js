'use strict';

const callInstapago = require('./lib/call-instapago');

function Instapago(keyId, publicKeyId) {
	if (!keyId || !publicKeyId) {
		const message = 'Los parámetros "keyId" y "publicKeyId" son requeridos para procesar la petición.';
		throw new Error(message);
	} else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
		const message = 'Los parámetros "keyId" y "publicKeyId" deben ser String.';
		throw new Error(message);
	}
	
	this._keys = {
		key_id: keyId,
		public_key_id: publicKeyId
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
    const requiredParams = [
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
    let missedParam;

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
	const endpoint = 'payment';
	const method = 'POST';

	check(config, (param) => {
        if (param) {
            const err = new Error(`El parámetro ${param} es requerido para procesar la petición.`);
            return callback(err);
        }

        process(this._keys, { endpoint, method }, config, callback);
    });
}

Instapago.prototype.continuePayment = function(config, callback) {
	const endpoint = 'complete';
	const method = 'POST';

	if (config && (!config.id || !config.amount)) {
		const err = new Error('Los parámetros "id" y "amount" son requeridos para procesar la petición.');
		return callback(err);
	};

	process(this._keys, { endpoint, method }, config, callback);
}

Instapago.prototype.cancelPayment = function(config, callback) {
	const endpoint = 'payment';
	const method = 'DELETE';

	if (config && !config.id) {
		const err = new Error('El parámetro "id" es requerido para procesar la petición.');
		return callback(err);
	};

	process(this._keys, { endpoint, method }, config, callback);
}

Instapago.prototype.paymentInfo = function(config, callback) {
	const endpoint = 'payment';
	const method = 'GET';

	if (config && !config.id) {
		const err = new Error('El parámetro "id" es requerido para procesar la petición.');
		return callback(err);
	};

	process(this._keys, { endpoint, method }, config, callback);
}

module.exports = Instapago;
