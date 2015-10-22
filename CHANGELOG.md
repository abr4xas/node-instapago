# Lista de cambios

> Todos los cambios significativos en la librería serán registrados en éste documento.

## 0.3.0 - [En proceso](https://github.com/abr4xas/node-instapago/compare/master...dev)

### Nuevo

* Se reescribió el código a Javascript ES2015 (ES6).
* Éste documento, así como `AUTORES.md` y `CONTRIBUCION.md`.

### Cambiado

* Se simplificó el contenido de `README.md`. Asimismo, se actualizó el ejemplo a ES6.

### Removido

* Se eliminó el archivo `CHANGELOG`.

### Obsoleto

* Compatibilidad con versiones de Node inferiores a **v4.0.0**.

## [0.2.3](https://github.com/abr4xas/node-instapago/tree/v0.2.3) - 2015-10-18

### Nuevo

* Validación de parámetros necesarios para hacer la llamada al *API de Instapago*.

### Cambiado

* Se mejoró el contenido de `DOCUMENTACION.md`.
* Se agregó en `README.md` un ejemplo de uso y una *nota* sobre la propiedad de los logos.

### Reparado

* Se resolvió un *bug* que impedía hacer una llamada correcta al *API de Instapago* cuando se utilizaba el método `paymentInfo`.

## [0.2.1](https://github.com/abr4xas/node-instapago/tree/v0.2.1) - 2015-10-17

### Nuevo

* Métodos `pay`, `continuePayment`, `cancelPayment`, `paymentInfo`.
* `DOCUMENTACION.md`
* `README.md`