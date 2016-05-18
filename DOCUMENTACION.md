<p align="center">
    <img alt="node-instapago" src="http://i.imgur.com/hYNsH6B.jpg" width="auto">
</p>
<p align="center">
    Documentación del módulo <b>Instapago</b>
</p>

----

## tabla de contenido

* [instalación](#instalación)
* [uso del módulo](#uso-del-módulo)
* [métodos del API](#métodos-del-api)
    * [crear pago](#crear-pago-payconfig-callback)
        * [parámetros requeridos para crear el pago](#parámetros-requeridos-para-crear-el-pago)
        * [parámetros opcionales para crear el pago](#parámetros-opcionales-para-crear-el-pago)
        * [ejemplo](#ejemplo)
    * [continuar pago](#continuar-pago-completepaymentconfig-callback)
    * [eliminar pago](#eliminar-pago-cancelpaymentconfig-callback)
    * [información del pago](#información-del-pago-paymentinfoconfig-callback)
* [ejemplo de voucher](#ejemplo-de-voucher)
* [códigos de respuesta](#códigos-de-respuesta)
* [licencia](#licencia)

## instalación

```bash
$ npm install instapago --save
```

## uso del módulo

```js
// Incluir el módulo en tu proyecto
import Instapago from 'instapago';

// Incluir las llaves de acceso al API de Instapago
const keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-PRIVADA>';
const publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>';

// Crear una nueva instancia de Instapago
const pago = new Instapago(keyId, publicKeyId);

// Efectuar un pago
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
> **Importante**: Se debe solicitar las llaves `keyId` y `publicKeyId` en la página de Instapago. [Aquí](https://instapago.com/wp-content/uploads/2016/02/Guia-Integracion-API-Instapago-1.6.pdf) puedes encontrar mayor información.
Además, se recomienda definirlas como variables de entorno para mayor seguridad.

## métodos del API

A continuación se describen los métodos disponibles en la librería Instapago.

### crear pago `pay(config, callback)`

Efectúa un pago con tarjeta de crédito, una vez procesado retornar una respuesta.

#### argumentos

`config` Objeto con los parámetros requeridos para efectuar un pago.

`callback` Función que será llamada una vez procesado el pago. La misma retorna dos argumentos: **err** y **respuesta**.

#### Parámetros _requeridos_ para crear el pago

* `amount` Monto a Debitar, utilizando punto (.) como separador decimal. Por ejemplo: 200.00
* `description` Texto con la descripción de la operación.
* `card_holder` Nombre del Tarjeta habiente.
* `card_holder_id` Cédula o RIF del Tarjeta habiente.
* `card_number` Número de la tarjeta de crédito, sin espacios ni
separadores.
* `cvc` Código secreto de la Tarjeta de crédito.
* `expiration_date` Fecha de expiración de la tarjeta en el formato mostrado
en la misma MM/YYYY. Por Ejemplo: 10/2015.
* `status_id` Status en el que se creará la transacción.
    * 1: Retener (Pre-Autorización).
    * 2: Pagar (Autorización).
* `ip` Dirección IP del cliente.

#### Parámetros _opcionales_ para crear el pago

* `order_number` Número de orden del pago según el comercio.
* `address` Dirección asociada a la tarjeta. Utilizada por algunos bancos para mayor seguridad.
* `city` Ciudad asociada a la tarjeta. Utilizada por algunos bancos para mayor seguridad.
* `zip_code` Código Postal asociada a la tarjeta. Utilizado por algunos bancos para mayor seguridad.
* `state` Estado o provincia asociada a la tarjeta. Utilizado por algunos bancos para mayor seguridad.

#### Ejemplo

Ejemplo.js

```js
import Instapago from 'instapago';

const keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-PRIVADA>';
const publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>';
const pago = new Instapago(key, publicKey);

pago.pay({
  amount: 37800,
  description: 'Calzados de tacón alto',
  card_holder: 'Mónica Márquez',
  card_holder_id: 12345678,
  card_number: 4111111111111111,
  cvc: 123,
  expiration_date: '10/2017',
  status_id: 2,
  ip: '127.0.0.1',
  order_number: 123456,
  address: 'calle 1, edificio 2, apartamento 3',
  city: 'Maracaibo',
  zip_code: 4002,
  state: 'Zulia'
}, function(err, respuesta) {
  if (err) {
    return console.log(err);
  }

  console.log(respuesta);
});
```
Una vez procesada la operación satisfactoriamente, se obtiene un resultado como el siguiente:

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

### continuar pago `completePayment(config, callback)`

Continúa un pago **Retenido** o **Pre-Aprobado**, una vez procesado retornar una respuesta.

#### argumentos

`config` Objeto con los parámetros requeridos para continuar un pago:

* `amount` Monto a Debitar, utilizando punto (.) como separador decimal. Por ejemplo: 200.00
* `id` Identificador único del pago que se desea continuar.

`callback` Función que será llamada una vez procesado el pago. La misma retorna dos argumentos: **err** y **respuesta**.

#### Ejemplo

Ejemplo.js

```js
// ...

pago.continuePayment({
  amount: 37800,
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}, function(err, respuesta) {
  if (err) {
    return console.log(err);
  }

  console.log(respuesta);
});
```
Una vez procesada la operación satisfactoriamente, se obtiene un resultado como el siguiente:

```json
{
  "success": true,
  "message": "Pago Completado",
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

### eliminar pago `cancelPayment(config, callback)`

Anula un pago, ya sea que el mismo estuviese **Retenido** o **Pre-Aprobado**. Una vez procesada la operación, retornar una respuesta.

> **Importante**: Actualmente, el API de Instapago no permite utilizar este método en *Modo de Pruebas*; al intentarlo se recibirá un error.

#### argumentos

`config` Objeto con los parámetros requeridos para anular un pago:

* `id` Identificador único del pago que se desea anular.

`callback` Función que será llamada una vez anulado el pago. La misma retorna dos argumentos: **err** y **respuesta**.

#### Ejemplo

Ejemplo.js

```js
// ...

pago.cancelPayment({
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}, function(err, respuesta) {
  if (err) {
    return console.log(err);
  }

  console.log(respuesta);
});
```
Una vez procesada la operación satisfactoriamente, se obtiene un resultado como el siguiente:

```json
{
  "success": true,
  "message": "Pago Anulado",
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

### información del pago `paymentInfo(config, callback)`

Consulta información sobre un pago generado anteriormente.

#### argumentos

`config` Objeto con los parámetros requeridos para consultar información sobre un pago:

* `id` Identificador único del pago que se desea consultar.

`callback` Función que será llamada una vez consultado el pago. La misma retorna dos argumentos: **err** y **respuesta**.

#### Ejemplo

Ejemplo.js

```js
// ...

pago.paymentInfo({
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}, function(err, respuesta) {
  if (err) {
    return console.log(err);
  }

  console.log(respuesta);
});
```
Una vez procesada la operación satisfactoriamente, se obtiene un resultado como el siguiente:

```json
{
  "success": true,
  "message": "Pre-autorizada",
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

### ejemplo de voucher

![voucher](http://i.imgur.com/sE05jmH.png)

### códigos de respuesta

Para todas las transacciones realizadas bajo el API de Instapago, los códigos HTTP de respuestas corresponden a los siguientes estados:

* ```201```: Pago procesado con éxito.
* ```400```: Error al validar los datos enviados (Adicionalmente se devuelve una cadena de
caracteres con la descripción del error).
* ```401```: Error de autenticación, ha ocurrido un error con las llaves utilizadas.
* ```403```: Pago Rechazado por el banco.
* ```500```: Ha Ocurrido un error interno dentro del servidor.
* ```503```: Ha Ocurrido un error al procesar los parámetros de entrada. Revise los datos
enviados y vuelva a intentarlo.

> **Importante**: Si recibe un código de respuesta diferente a los antes descritos deben ser tomados como errores de protocolo HTTP.

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2016 [Autores de la librería](AUTORES.md)