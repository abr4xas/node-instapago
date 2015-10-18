<p align="center">
    <img alt="node-instapago" src="http://i.imgur.com/hYNsH6B.jpg" width="auto">
</p>
<p align="center" style="color:#707070;">
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
## uso

### instalación

```bash
$ npm install instapago
```
### usa de la librería

```
var Instapago = require('instapago'),
    key = '',
    publicKey = '',
    pago = new Instapago(key, publicKey);
```
> Debe solicitar las llaves (`key`,`publicKey`) en la página de instapago. Para mayor información clic [aquí](http://instapago.com/wp-content/uploads/2015/04/Guia-Integracion-API-Instapago-1.5.4.pdf)

## documentación
* [Documentación de la líbreria "instapago"](DOCUMENTACION.md)

## licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez & Angel Cruz

### NOTA
Los logos son propiedad de Instapago y Banesco respectivamente.
