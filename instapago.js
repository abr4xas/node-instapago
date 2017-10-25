'use strict';

import { axios as http } from 'axios';

function instapago({keyId, publicKeyId, strict = true}) {
  if (!keyId || !publicKeyId) {
    throw new Error('Los parámetos keyId y publicKeyId son requerido');
  } else if (typeof keyId !== 'string' || typeof publicKeyId !== 'string') {
    throw new Error('Los parámetos keyId y publicKeyId deben ser String.');
  }

  const config = {
    keyId,
    publicKeyId,
    strict
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
  const params = Object.assign({}, config, data);
  let endpoint;
  let method;

  switch (type) {
    case 'pay':
      endpoint = 'payment';
      method = 'POST';
      break;

    case 'resume':
      endpoint = 'complete';
      method = 'POST';
      break;

    case 'cancel':
      endpoint = 'payment';
      method = 'DELETE';
      break;

    case 'view':
      endpoint = 'payment';
      method = 'GET';
      break;
  }

  if (config.strict && validation.error) {
    return new Promise((resolve, reject) => reject(validation.error));
  } else {
    return http({
      method,
      url: `https://api.instapago.com/${endpoint}`,
      params: params
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
