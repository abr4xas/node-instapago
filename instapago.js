'use strict';

import https from 'https';
import querystring from 'querystring';
import { version } from './package.json';

function instapago(keyId, publicKeyId, strict = true) {
  if (!keyId || !publicKeyId) {
    throw new Error('Los parámetros keyId y publicKeyId son requeridos.');
  } else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
    throw new Error('Los parámetros keyId y publicKeyId deben ser String.');
  }

  const config = {
    strict,
    keys: {
      keyId,
      publicKeyId
    }
  };

  return {
    pay: data => processPayment('pay', config, data),
    resume: data => processPayment('resume', config, data),
    cancel: data => processPayment('cancel', config, data),
    view: data => processPayment('view', config, data)
  }
}

function processPayment(type, config, data) {
  const validation = validatePaymentData(type, data);
  const params = Object.assign({}, config.keys, data);
  let endpoint = 'payment';
  let method = 'POST';

  if (type !== 'pay') {
    if (type === 'resume') endpoint = 'complete';
    if (type === 'cancel') method = 'DELETE';
    if (type === 'view') method = 'GET';
  }

  if (config.strict && validation.error) {
    return new Promise((resolve, reject) => reject(validation.error));
  } else {
    return new Promise((resolve, reject) => {
      const qs = querystring.stringify(params);
      const request = https.request({
        hostname: 'api.instapago.com',
        path: `/${endpoint}?${qs}`,
        method: method,
        headers: {
          'Accept': '*/*',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Content-Length': Buffer.byteLength(qs),
          'User-Agent': `node-instapago/${version}`
        }
      });

      request.on('error', error => reject(error));
      request.on('response', response => {
        const raw = [];

        response.on('data', chunk => raw.push(chunk));
        response.on('end', () => {
          const _data = Buffer.concat(raw).toString();
          const _meta = response;

          resolve(handleResponse(_data, _meta));
        });
      });

      request.write(qs);
      request.end();
    });
  }
}

function validatePaymentData(type, data) {
  const result = {};
  const _data = {};

  Object.keys(data).forEach(key => {
    Object.assign(_data, {[key.toLowerCase()]: data[key]});
  });

  const rules = [
    {
      param: 'id',
      rule: 'Cadena de caracteres con el indicador único de pago.',
      valid: typeof _data.id === 'string'
    },
    {
      param: 'amount',
      rule: 'Sólo caracteres numéricos y punto (.) como separador decimal.',
      valid: /[0-9]/.test(_data.amount)
    },
    {
      param: 'description',
      rule: 'Cadena de caracteres con los detalles de la operación.',
      valid: typeof _data.description === 'string'
    },
    {
      param: 'cardholder',
      rule: 'Sólo caracteres alfabéticos, incluyendo la letra ñ y espacio.',
      valid: /^[ñA-Za-z\s]*$/.test(_data.cardholder)
    },
    {
      param: 'cardholderid',
      rule: 'Sólo caracteres numéricos; mínimo 6 dígitos y máximo 8.',
      valid: /^[0-9]{6,8}$/.test(_data.cardholderid)
    },
    {
      param: 'cardnumber',
      rule: 'Sólo caracteres numéricos; mínimo 15 dígitos y máximo 16.',
      valid: /^[0-9]{15,16}$/.test(_data.cardnumber)
    },
    {
      param: 'cvc',
      rule: 'Sólo caracteres numéricos; deben ser 3 dígitos.',
      valid: /^[0-9]{3}$/.test(_data.cvc)
    },
    {
      param: 'expirationdate',
      rule: 'Sólo fechas mayores a la fecha en curso, en formato MM/YYYY.',
      valid: isCardExpired(_data.expirationdate)
    },
    {
      param: 'statusid',
      rule: 'Sólo caracteres numéricos; debe ser 1 dígito.',
      valid: /^[1-2]{1}$/.test(_data.statusid)
    },
    {
      param: 'ip',
      rule: 'Dirección IP del cliente que genera la solicitud del pago.',
      valid: typeof _data.description === 'string'
    }
  ];
  let requiredParams = ['id'];

  if (type === 'pay') {
    requiredParams = [
      'amount',
      'description',
      'cardholder',
      'cardholderid',
      'cardnumber',
      'cvc',
      'expirationdate',
      'statusid',
      'ip'
    ];
  } else if (type === 'resume') {
    requiredParams = ['id', 'amount'];
  }

  requiredParams.every(param => {
    const _param = rules.find(rule => rule.param === param);

    if (_data[param] && _param.valid) {
      return true;
    }

    result.error = new Error(`Parámetro inválido (${param}): ${_param.rule}`);

    return false;
  });

  return result;
}

function handleResponse(data, metadata) {
  const response = {
    statusCode: metadata.statusCode,
    statusMessage: metadata.statusMessage,
    headers: metadata.headers,
    data: JSON.parse(data)
  };

  switch(response.data.code) {
    case '201':
      response.code = 'PAYMENT_SUCCEED';
      response.message = 'El pago ha sido procesado satisfactoriamente.';
      break;

    case '400':
      response.code = 'PAYMENT_INFO_INVALID';
      response.message = 'Error al validar los datos enviados.';
      break;

    case '401':
      response.code = 'INSTAPAGO_AUTH_ERROR';
      response.message = 'Ha ocurrido un error con las llaves utilizadas.';
      break;

    case '403':
      response.code = 'PAYMENT_FAILED';
      response.message = 'Pago rechazado por el banco.';
      break;

    case '500':
      response.code = 'SOMETHING_WENT_WRONG';
      response.message = 'Ha ocurrido un error dentro del servidor de Instapago.';
      break;

    case '503':
      response.code = 'INSTAPAGO_IS_TEMPORARILY_UNAVAILABLE';
      response.message = 'Ha ocurrido un error al procesar los parámetros de entrada.';
      break;
  }

  return response;
}

function isCardExpired(date) {
  const _date = date ? date.split('/') : null;

  if (_date) {
    const yearOnCard = parseInt(_date[1]);
    const monthOnCard = parseInt(_date[0]);
    const year = new Date().getFullYear();
    const month = new Date().getUTCMonth() + 1;

    return ((yearOnCard === year && monthOnCard >= month) || yearOnCard > year);
  }

  return false;
}

export default instapago;
