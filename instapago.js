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

function processPayment({type, config, data}) {
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

  return http({
    method,
    url: `https://api.instapago.com/${endpoint}`,
    params: params
  });
}

export default instapago;
