## DOCUMENTACIÓN
---
Bienvenido a la documentación oficial del módulo `instapago`.

### Tabla de contenido

* [instalación]()
* [uso del módulo]()
* [crear pago]()
* [procesar pago]()
* [eliminar pago]()

### instalación

Existen dos formas:

* De forma local:
```bash
$ npm install instapago
```
* De forma global (puede necesitar usar `sudo`):
```bash
$ npm install -g instapago
```

### uso del módulo

* incluir el módulo
```javascript
var Instapago = require('instapago');
```
* incluir las llaves de acceso al API de instapago
```javascript
var key = '';
var publicKey = '';
```
> Debe solicitar las llaves (`key`,`publicKey`) en la página de instapago. Para mayor información clic [aquí](http://instapago.com/wp-content/uploads/2015/04/Guia-Integracion-API-Instapago-1.5.4.pdf)

* creamos la instancia
```javascript
    var pago = new Instapago(key, publicKey);
```

Tambien podemos hacerlo de la siguiente forma:

```javascript
var Instapago = require('instapago'),
    key = '',
    publicKey = '',
    pago = new Instapago(key, publicKey);
```

#### crear pago
TODO
#### procesar pago
TODO
#### eliminar pago
TODO
