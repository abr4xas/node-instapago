<p align="center">
    <img alt="node-instapago" src="http://i.imgur.com/hYNsH6B.jpg" width="auto">
</p>
<p align="center">
    Librería Instapago para Node.js
</p>
<p align="center">
    <a href="https://www.npmjs.com/package/instapago">
        <img src="https://img.shields.io/npm/v/instapago.svg?style=flat-square" alt="npm version">
    </a>
    <a href="https://www.npmjs.com/package/instapago">
        <img alt="descargas" src="https://img.shields.io/npm/dt/instapago.svg?style=flat-square">
    </a>
    <a href="https://badge.fury.io/js/instapago">
        <img alt="dependencias" src="https://david-dm.org/abr4xas/node-instapago.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/instapago">
        <img alt="licencia" src="https://img.shields.io/npm/l/venezuela.svg?style=flat-square">
    </a>
</p>
<p align="center">
    <sup style="color: #d0d0d0;"><b>NOTA</b> Los logos son propiedad de Instapago y Banesco, respectivamente.</sup>
</p>

----

## instalación

```bash
$ npm install instapago
```

## ejemplo

```js
import Instapago from 'instapago';

const pago = new Instapago('<LLAVE-PRIVADA>', '<LLAVE-PÚBLICA>');

pago.pay({
  amount: 500,
  description: 'Probando el módulo Instapago',
  card_holder: 'Nombre Apellido',
  card_holder_id: 12345678,
  card_number: 4111111111111111,
  cvc: 123,
  expiration_date: '10/2017',
  status_id: 2,
  ip: '127.0.0.1'
}, function(error, respuesta) {
  if (error) {
    // hacer algo con el error.
  }

  // hacer algo con la respuesta.
});
```
## enlaces

* [Documentación de la librería Instapago](DOCUMENTACION.md)
* [Registro de cambios](CHANGELOG.md)
* [Colaboración](CONTRIBUCION.md)
* [Autores](AUTORES.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2016 [Autores de la librería](AUTORES.md)