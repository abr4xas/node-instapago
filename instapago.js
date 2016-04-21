'use strict';

import request from 'request';

class Instapago {
  constructor(keyId, publicKeyId) {
    if (!keyId || !publicKeyId) {
      const message = 'Los parámetros \'keyId\' y \'publicKeyId\' son requeridos para procesar la petición.';

      throw new Error(message);
    } else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
      const message = 'Los parámetros \'keyId\' y \'publicKeyId\' deben ser String.';

      throw new Error(message);
    }

    this._keys = {
      key_id: keyId,
      public_key_id: publicKeyId
    };
  }

  pay(config, callback) {
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

  continuePayment(config, callback) {
    const endpoint = 'complete';
    const method = 'POST';

    if (config && (!config.id || !config.amount)) {
      const err = new Error('Los parámetros \'id\' y \'amount\' son requeridos para procesar la petición.');

      return callback(err);
    };

    process(this._keys, { endpoint, method }, config, callback);
  }

  cancelPayment(config, callback) {
    const endpoint = 'payment';
    const method = 'DELETE';

    if (config && !config.id) {
      const err = new Error('El parámetro \'id\' es requerido para procesar la petición.');

      return callback(err);
    };

    process(this._keys, { endpoint, method }, config, callback);
  }

  paymentInfo(config, callback) {
    const endpoint = 'payment';
    const method = 'GET';

    if (config && !config.id) {
      const err = new Error('El parámetro \'id\' es requerido para procesar la petición.');

      return callback(err);
    };

    process(this._keys, { endpoint, method }, config, callback);
  }
}

function process(keys, options, config, callback) {
	if (!config || typeof config !== 'object') {
		throw new Error('El primer parámetro debe ser un Objeto.');
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

function callInstapago(config, callback) {
  const url = `https://api.instapago.com/${config.endpoint}`;
  const method = config.method;
  const keyId = config.key_id;
  const publicKeyId = config.public_key_id;
  const options = {
    url,
    method
  };
  const querystring = {
    keyId,
    publicKeyId
  };

  if (config.method === 'GET' || config.method === 'DELETE') {
    querystring['Id'] = config.id;
    options['qs'] = querystring;
  } else if (config.method === 'POST' && config.endpoint === 'payment') {
    querystring['Amount'] = config.amount;
    querystring['Description'] = config.description;
    querystring['CardHolder'] = config.card_holder;
    querystring['CardHolderID'] = config.card_holder_id;
    querystring['CardNumber'] = config.card_number;
    querystring['CVC'] = config.cvc;
    querystring['ExpirationDate'] = config.expiration_date;
    querystring['StatusId'] = config.status_id;
    querystring['IP'] = config.ip;
    querystring['OrderNumber'] = config.order_number;
    querystring['Address'] = config.address;
    querystring['City'] = config.city;
    querystring['ZipCode'] = config.zip_code;
    querystring['State'] = config.state;
    options['form'] = querystring;
  } else if (config.method === 'POST' && config.endpoint === 'complete') {
    querystring['Id'] = config.id;
    querystring['Amount'] = config.id;
    options['form'] = querystring;
  }

  function cb(error, response, body) {
    if (error) {
      return callback(error);
    }

    if (response.statusCode !== 201) {
      return callback(body);
    }

    return callback(null, body);
  }

  request(options, cb);
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

export default Instapago;
