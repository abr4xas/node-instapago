'use strict';

var request = require('request');

function callInstapago(config, callback) {
    var options = {
        url: 'https://api.instapago.com/' + config.endpoint,
        method: config.method
    };
    var querystring = {
        'KeyId': config.key_id,
        'PublicKeyId': config.public_key_id
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

module.exports = callInstapago;
