<p align="center">
    <img alt="node-instapago" src="https://i.imgur.com/VBWxl1h.png" width="500">
</p>
<p align="center">
    Documentación de la librería <b>Instapago</b>
</p>

----

## tabla de contenido

* [acerca de la librería](#acerca-de-la-librería)
* [instalación](#instalación)
* [inicialización](#inicialización)
* [métodos del API](#métodos-del-api)
    * [crear pago](#crear-pago)
    * [continuar pago](#continuar-pago)
    * [cancelar pago](#cancelar-pago)
    * [ver pago](#ver-pago)
* [voucher de ejemplo](#voucher-de-ejemplo)
* [códigos de respuesta](#códigos-de-respuesta)
* [licencia](#licencia)

## acerca de la librería

Librería Instapago para NodeJS basada en _Promesas_ :zap:

## instalación

```bash
$ npm install instapago --save
```

## inicialización

### inicializar instapago `instapago(keyId, publicKeyId[, strictMode])` :rocket:

Configura la libería con las llaves de acceso a la plataforma **Instapago** e indica si se debe o no validar los datos antes de cada petición.

> **Importante**: Se debe solicitar las llaves `keyId` y `publicKeyId` en la página de Instapago. [Aquí](https://instapago.com/wp-content/uploads/2016/02/Guia-Integracion-API-Instapago-1.6.pdf) puedes encontrar mayor información.
Además, se recomienda definirlas como variables de entorno para mayor seguridad.

#### argumentos

`keyId` String con la llave **privada** generada desde Instapago.

`publicKeyId` String con la llave compartida enviada por correo electrónico al momento de crear la cuenta en el portal de InstaPago.

`strictMode` _(opcional)_ Boolean que indica si se deben validar los datos de manera estricta antes de realizar una petición a Instapago. Por defecto es `true`.

#### ejemplo

```js
// Incluir el módulo en tu proyecto
import instapago from 'instapago';

// Incluir las llaves de acceso al API de Instapago
const keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-PRIVADA>';
const publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>';

// Inicializar Instapago
const i = instapago(keyId, publicKeyId);
```

## métodos del API

A continuación se describen los métodos disponibles en la librería Instapago.

### crear pago `pay(data)` :credit_card:

Efectúa un pago con tarjeta de crédito. Una vez procesado, retorna una _Promesa_.

#### argumentos

`data` Objeto con los parámetros requeridos para efectuar un pago.

#### parámetros _requeridos_ para crear el pago

* `amount` Monto a Debitar, utilizando punto (.) como separador decimal. Por ejemplo: 9999.99
* `description` Texto con la descripción de la operación.
* `cardholder` Nombre del Tarjeta habiente.
* `cardholderid` Cédula o RIF del Tarjeta habiente.
* `cardnumber` Número de la tarjeta de crédito, sin espacios ni
separadores.
* `cvc` Código secreto de la Tarjeta de crédito.
* `expirationdate` Fecha de expiración de la tarjeta en el formato mostrado
en la misma MM/YYYY. Por Ejemplo: 10/2018.
* `statusid` Status en el que se creará la transacción.
    * 1: Retener (Pre-Autorización).
    * 2: Pagar (Autorización).
* `ip` Dirección IP del cliente.

#### parámetros _opcionales_ para crear el pago

* `ordernumber` Número de orden del pago según el comercio.
* `address` Dirección asociada a la tarjeta. Utilizada por algunos bancos para mayor seguridad.
* `city` Ciudad asociada a la tarjeta. Utilizada por algunos bancos para mayor seguridad.
* `zipcode` Código Postal asociada a la tarjeta. Utilizado por algunos bancos para mayor seguridad.
* `state` Estado o provincia asociada a la tarjeta. Utilizado por algunos bancos para mayor seguridad.

#### ejemplo

```js
// ...

// Crear pago
i.pay({
  amount: 2500000,
  description: 'Calzados de tacón alto',
  cardholder: 'Mónica Márquez',
  cardholderid: 12345678,
  cardnumber: 4111111111111111,
  cvc: 123,
  expirationdate: '10/2018',
  statusid: 2,
  ip: '127.0.0.1',
  ordernumber: 123456,
  address: 'calle 1, edificio 2, apartamento 3',
  city: 'Maracaibo',
  zipcode: 4002,
  state: 'Zulia'
}).then(respuesta => {
  console.log(respuesta.data);
}).catch(error => console.error(error));
```
Si la operación fue procesada satisfactoriamente, se obtendrá un resultado como el siguiente:

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

### continuar pago `resume(data)` :money_with_wings:

Reanuda un pago **Retenido** o **Pre-Aprobado**. Una vez procesado, retorna una _Promesa_.

#### argumentos

`data` Objeto con los parámetros requeridos para continuar un pago:

* `amount` Monto a Debitar, utilizando punto (.) como separador decimal. Por ejemplo: 200.00
* `id` Identificador único del pago que se desea continuar.

#### ejemplo

```js
// ...

// Continuar pago
i.resume({
  amount: 2500000,
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}).then(respuesta => {
  console.log(respuesta.data);
}).catch(error => console.error(error));
```
Si la operación fue procesada satisfactoriamente, se obtendrá un resultado como el siguiente:

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

### cancelar pago `cancel(data)` :x:

Anula un pago, ya sea que el mismo estuviese **Retenido** o **Pre-Aprobado**. Una vez procesado, retorna una _Promesa_.

> **Importante**: Actualmente, el API de Instapago no permite utilizar este método en *Modo de Pruebas*; al intentarlo se recibirá un error.

#### argumentos

`data` Objeto con los parámetros requeridos para anular un pago:

* `id` Identificador único del pago que se desea anular.

#### ejemplo

```js
// ...

// Cancelar pago
i.cancel({
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}).then(respuesta => {
  console.log(respuesta.data);
}).catch(error => console.error(error));
```
Si la operación fue procesada satisfactoriamente, se obtendrá un resultado como el siguiente:

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

### ver pago `view(data)` :mag:

Consulta información sobre un pago generado anteriormente. Una vez procesado, retorna una _Promesa_.

#### argumentos

`data` Objeto con los parámetros requeridos para consultar información sobre un pago:

* `id` Identificador único del pago que se desea consultar.

#### ejemplo

```js
// ...

// Ver pago
i.view({
  id: 'c12bd3ff-4e15-6a7c-89e0-1b2d03b4ae56'
}).then(respuesta => {
  console.log(respuesta.data);
}).catch(error => console.error(error));
```
Si la operación fue procesada satisfactoriamente, se obtendrá un resultado como el siguiente:

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

### voucher de ejemplo

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

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2017 [Autores de la librería](AUTORES.md)
