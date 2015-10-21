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
<p align="center">
    <sup style="color: #d0d0d0;">**NOTA** Los logos son propiedad de Instapago y Banesco, respectivamente.</sup>
</p>

----

## instalación

```bash
$ npm install instapago
```
Instapago requiere **Node v4.0.0** o superior para el soporte (parcial) de ES2015.

## ejemplo

```js
const Instapago = require('instapago');
const pago = new Instapago('<LLAVE-PRIVADA>', '<LLAVE-PÚBLICA>');

pago.pay({
    amount: '500',
    description: 'Probando el módulo Instapago',
    card_holder: 'Nombre Apellido',
    card_holder_id: '12345678',
    card_number: '4111111111111111',
    cvc: '123',
    expiration_date: '10/2017',
    status_id: '2',
    ip: '127.0.0.1'
}, function(err, respuesta) {
    if (err) {
        // haz algo con el error.
    }
    // haz algo con la respuesta.
});
```
## enlaces

* [Documentación de la librería Instapago](DOCUMENTACION.md)
* [Registro de cambios](CHANGELOG.md)
* [Colaboración](CONTRIBUTING.md)
* [Autores](AUTHORS.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2015 [Autores de la librería](AUTHORS.md)