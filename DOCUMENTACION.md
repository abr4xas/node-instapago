## DOCUMENTACIÓN
---
Bienvenido a la documentación oficial del módulo `instapago`.

### Tabla de contenido

* [instalación](#instalación)
* [uso del módulo](#uso-del-módulo)
* [crear pago](#crear-pago)
    * [Parámetros requeridos para crear el pago](#parámetros-requeridos-para-crear-el-pago)
    * [creación del pago con los valores requeridos](#creación-del-pago-con-los-valores-requeridos)
    * [Parámetros opcionales para crear el pago](#parámetros-opcionales-para-crear-el-pago)
    * [Respuesta](#respuesta)
* [procesar pago]()
* [eliminar pago]()
* [Ejemplo de voucher](#ejemplo-de-voucher)
* [Códigos de respuesta](#códigos-de-respuesta)

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
var keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-GENERADA-POR-INSTAPAGO>';
var publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>';
```
> Debe solicitar las llaves (`keyId`,`publicKeyId`) en la página de instapago. Para mayor información clic [aquí](http://instapago.com/wp-content/uploads/2015/04/Guia-Integracion-API-Instapago-1.5.4.pdf)

* creamos la instancia
```javascript
    var pago = new Instapago(key, publicKey);
```

Tambien podemos hacerlo de la siguiente forma:

```javascript
var Instapago = require('instapago'),
    keyId = process.env.INSTAPAGO_KEYID || '<LLAVE-GENERADA-POR-INSTAPAGO>',
    publicKeyId = process.env.INSTAPAGO_PUBLICKEYID || '<LLAVE-PUBLICA>',
    pago = new Instapago(keyId, publicKeyId);
```

### crear pago
Este método consta del envío de los datos de un pago con tarjeta de crédito a Instapago para su autorización  simplemente llamamos al método `pago.pay({});`

#### Parámetros requeridos para crear el pago
* KeyId (Requerido): Llave generada desde Instapago.
* PublicKeyId (Requerido): Llave compartida Enviada por correo al crear una cuenta
en instapago.
* Amount (Requerido): Monto a Debitar, utilizando punto “.” Como separador decimal.
Por ejemplo: 200.00.
* Description (Requerido): Cadena de caracteres con la descripción de la operación.
* CardHolder (Requerido): Nombre del Tarjeta habiente.
* CardHolderID (Requerido): Cédula o RIF del Tarjeta habiente.
* CardNumber (Requerido): Numero de la tarjeta de crédito, sin espacios ni
separadores.
* CVC (Requerido): Código secreto de la Tarjeta de crédito.
* ExpirationDate (Requerido): Fecha de expiración de la tarjeta en el formato mostrado
en la misma MM/YYYY. Por Ejemplo: 10/2014.
* StatusId (Requerido): Estatus en el que se creará la transacción.
    * "1": Retener (pre-autorización).
    * "2": Pagar (autorización).
* IP (Requerido): Dirección IP del cliente.


> NOTA: Debe tener en cuenta la opción `StatusId` es muy importante determinar cual de las opciones es necesaria para la aplicación.

#### creación del pago con los valores requeridos

```javascript
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

#### Parámetros opcionales para crear el pago
* OrderNumber (Opcional): Numero de orden del pago según el comercio.
* Address (Opcional): Dirección asociada a la tarjeta, Utilizada por algunos bancos
para mayor seguridad.
* City (Opcional): Ciudad asociada a la tarjeta, Utilizada por algunos bancos para
mayor seguridad.
* ZipCode (Opcional): Código Postal asociada a la tarjeta, Utilizada por algunos
bancos para mayor seguridad.
* State (Opcional): Estado o provincia asociada a la tarjeta, Utilizada por algunos
bancos para mayor seguridad.

#### creación del pago con los valores opcionales

```javascript
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

#### Respuesta

De realizar el procedimiento de forma correcta vamos a obtener un resultado como el siguiente:

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

#### procesar pago
TODO
#### eliminar pago
TODO
#### Ejemplo de voucher
![voucher](http://i.imgur.com/sE05jmH.png)
#### Códigos de respuesta

Para todas las transacciones realizadas bajo el API de Instapago, los códigos HTTP de respuestas corresponden a los siguientes estados:

* ```201```: Pago procesado con éxito.
* ```400```: Error al validar los datos enviados (Adicionalmente se devuelve una cadena de
caracteres con la descripción del error).
* ```401```: Error de autenticación, ha ocurrido un error con las llaves utilizadas.
* ```403```: Pago Rechazado por el banco.
* ```500```: Ha Ocurrido un error interno dentro del servidor.
* ```503```: Ha Ocurrido un error al procesar los parámetros de entrada. Revise los datos
enviados y vuelva a intentarlo.

> **Importante**: Si recibe un código de respuesta diferente a los antes descritos deben ser tomados como errores de protocolo HTTP.
