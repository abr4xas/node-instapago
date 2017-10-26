<p align="center">
    <img alt="node-instapago" src="https://i.imgur.com/VBWxl1h.png" width="500">
</p>
<p align="center">
    Librería Instapago para NodeJS basada en _Promesas_.
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
import instapago from 'instapago';

const i = instapago('<LLAVE-PRIVADA>', '<LLAVE-PÚBLICA>');

i.pay({
  amount: 60000,
  description: 'Probando el módulo Instapago',
  cardholder: 'Nombre Apellido',
  cardholderid: 12345678,
  cardnumber: 4111111111111111,
  cvc: 123,
  expirationdate: '10/2018',
  statusid: 2,
  ip: '127.0.0.1'
}).then(respuesta => {
  console.log(respuesta.data);
}).catch(error => console.error(error));
```
## enlaces

* [Documentación de la librería Instapago](DOCUMENTACION.md)
* [Registro de cambios](CHANGELOG.md)
* [Colaboración](CONTRIBUCION.md)
* [Autores](AUTORES.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2017 [Autores de la librería](AUTORES.md)
