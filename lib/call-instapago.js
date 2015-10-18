'use strict';

var request = require('request');

function callInstapago(config, callback) {
	var params = {};

    if (config.method === 'GET' || config.method === 'DELETE') {
        params['Id'] = config.id;
    } else if (config.method === 'POST' && config.endpoint === 'payment') {
        params = {
            'Amount': config.amount,
            'Description': config.description,
            'CardHolder': config.card_holder,
            'CardHolderID': config.card_holder_id,
            'CardNumber': config.card_number,
            'CVC': config.cvc,
            'ExpirationDate': config.expiration_date,
            'StatusId': config.status_id,
            'IP': config.ip,
            'OrderNumber': config.order_number,
            'Address': config.address,
            'City': config.city,
            'ZipCode': config.zip_code,
            'State': config.state
        };
    } else if (config.method === 'POST' && config.endpoint === 'complete') {
        params = {
            'Amount': config.amount,
            'Id': config.id
        };
    }

    params['KeyId'] = config.key_id;
    params['PublicKeyId'] = config.public_key_id;
    
    var options = {
        url: 'https://api.instapago.com/' + config.endpoint,
        method: config.method,
        form: params
    };

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

module.exports = callInstapago;
