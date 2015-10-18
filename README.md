<p align="center">
    <img alt="node-instapago" src="http://i.imgur.com/hYNsH6B.jpg" width="auto">
</p>
<p align="center">
    Librería Instapago para Node.js
</p>
<p align="center">
    <a href="https://badge.fury.io/js/instapago">
        <img src="https://badge.fury.io/js/instapago.svg" alt="npm version" height="18">
    </a>
    <a href="https://www.npmjs.com/package/instapago">
        <img alt="descargas" src="https://img.shields.io/npm/dt/instapago.svg">
    </a>
    <a href="https://badge.fury.io/js/instapago">
        <img alt="dependencias" src="https://david-dm.org/abr4xas/node-instapago.svg">
    </a>
    <a href="https://www.npmjs.com/package/instapago">
        <img alt="licencia" src="https://img.shields.io/npm/l/venezuela.svg">
    </a>
</p>
----

## instalación

```bash
$ npm install instapago
```

## uso

```js
var Instapago = require('instapago');

// Llaves de acceso al API de Instapago.
var keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-GENERADA-POR-INSTAPAGO>';
var publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>';

// Nueva instancia de Instapago.
var pago = new Instapago(keyId, publicKeyId);

// Efectuar un nuevo pago.
pago.pay({
    amount: '500',
    description: 'Probando el módulo Instapago',
    card_holder: 'Nombre Apellido',
    card_holder_id: '12345678',
    card_number: '4111111111111111',
    cvc: '123',
    expiration_date: '10/2017',
    status_id: '2',
    ip: '127.0.0.1',
    order_number: '123456',
    address: 'calle 1, avenida 2, casa 3',
    city: 'Maracaibo',
    zip_code: '4002',
    state: 'Zulia'
}, function(err, respuesta) {
    if (err) {
        // haz algo con el error.
    }
    // haz algo con la respuesta.
});
```

La respuestá será así:

```json
{
    "success": true,
    "message": "Pago Aprobado",
    "id": "c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56",
    "code": "201",
    "reference": "123456",
    "voucher": "<HTML del voucher>",
    "ordernumber": "123456",
    "sequence": "123456",
    "approval": "123456",
    "lote": "123456",
    "responsecode": "00",
    "deferred": false
}
```

## documentación
* [Documentación de la líbreria Instapago](DOCUMENTACION.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez & Angel Cruz

<sup>**NOTA** Los logos son propiedad de Instapago y Banesco, respectivamente.</sup>