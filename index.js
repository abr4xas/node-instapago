'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function Instapago(keyId, publicKeyId) {
  if (!keyId || !publicKeyId) {
    var message = 'Los parámetros "keyId" y "publicKeyId" son requeridos para procesar la petición.';
    throw new Error(message);
  } else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
    var message = 'Los parámetros "keyId" y "publicKeyId" deben ser String.';
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

  callInstapago(config, function (err, response) {
    if (err) {
      return callback(err);
    }

    return callback(null, response);
  });
}

function callInstapago(config, callback) {
  var url = 'https://api.instapago.com/' + config.endpoint;
  var method = config.method;
  var keyId = config.key_id;
  var publicKeyId = config.public_key_id;
  var options = {
    url: url,
    method: method
  };
  var querystring = {
    keyId: keyId,
    publicKeyId: publicKeyId
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

  (0, _request2['default'])(options, cb);
}

function check(obj, callback) {
  var requiredParams = ['amount', 'description', 'card_holder', 'card_holder_id', 'card_number', 'cvc', 'expiration_date', 'status_id', 'ip'];
  var missedParam = undefined;

  requiredParams.some(function (param) {
    if (!obj.hasOwnProperty(param)) {
      missedParam = param;
      return true;
    }

    return false;
  });

  return callback(missedParam);
}

Instapago.prototype.pay = function (config, callback) {
  var _this = this;

  var endpoint = 'payment';
  var method = 'POST';

  check(config, function (param) {
    if (param) {
      var err = new Error('El parámetro ' + param + ' es requerido para procesar la petición.');
      return callback(err);
    }

    process(_this._keys, { endpoint: endpoint, method: method }, config, callback);
  });
};

Instapago.prototype.continuePayment = function (config, callback) {
  var endpoint = 'complete';
  var method = 'POST';

  if (config && (!config.id || !config.amount)) {
    var err = new Error('Los parámetros "id" y "amount" son requeridos para procesar la petición.');
    return callback(err);
  };

  process(this._keys, { endpoint: endpoint, method: method }, config, callback);
};

Instapago.prototype.cancelPayment = function (config, callback) {
  var endpoint = 'payment';
  var method = 'DELETE';

  if (config && !config.id) {
    var err = new Error('El parámetro "id" es requerido para procesar la petición.');
    return callback(err);
  };

  process(this._keys, { endpoint: endpoint, method: method }, config, callback);
};

Instapago.prototype.paymentInfo = function (config, callback) {
  var endpoint = 'payment';
  var method = 'GET';

  if (config && !config.id) {
    var err = new Error('El parámetro "id" es requerido para procesar la petición.');
    return callback(err);
  };

  process(this._keys, { endpoint: endpoint, method: method }, config, callback);
};

exports['default'] = Instapago;
module.exports = exports['default'];
