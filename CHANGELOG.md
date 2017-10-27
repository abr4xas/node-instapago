# Lista de cambios

> Todos los cambios significativos en la librería serán registrados en éste documento.

## [0.5.1](https://github.com/abr4xas/node-instapago/tree/v0.5.1) - 2017-10-27

### Cambiado

* Se mejoró la redacción en `README.md` y `DOCUMENTACION.md`.

### Reparado

* Se corrigieron errores en los enlaces de la Tabla de Contenido de `DOCUMENTACION.md`.

## [0.5.0](https://github.com/abr4xas/node-instapago/tree/v0.5.0) - 2017-10-26

### Nuevo

* Se reescribió la librería. Ahora es una _Factory Function_ basada en _Promesas_.
* Se agregaron los métodos `resume`, `cancel` y `view`.
* Se agregó la validación estricta de datos de una petición.
* Se especifica el nombre de la librería en el encabezado HTTP _User-Agent_.

### Cambiado

* La librería **ya no retorna una _Class Function_**, por lo tanto el uso de `new Instapago` es OBSOLETO.
* Los métodos `continuePayment`, `cancelPayment` y `paymentInfo` son **OBSOLETOS**.
* Los métodos de la librería **ya no retornan _callbacks_, sólo promesas**.
* Los parámetros para hacer una petición deben ser nombrados en estilo _CamelCase_ o en minúsculas. **El estilo _underscore_ es OBSOLETO_**.
* Se actualizaron las dependencias.
* Se actualizó el contenido de `README.md` y `DOCUMENTACION.md`.

## [0.4.2](https://github.com/abr4xas/node-instapago/tree/v0.4.2) - 2016-05-16

### Reparado

* Se solucionó un *bug* que retornaba los resultados correctos cuando se suponía que debía retornar los errores.

## [0.4.1](https://github.com/abr4xas/node-instapago/tree/v0.4.1) - 2016-04-21

### Cambiado

* Se modificó el tamaño del indentado en el código; tanto en `instapago.js` como en los ejemplos mostrados en `README.md` y `DOCUMENTACION.md`.
* Se actualizó la fecha de los derechos en `README.md` y `DOCUMENTACION.md`.
* Se corrigieron algunos errores tipográfico en `instapago.js` y enlaces rotos en `DOCUMENTACION.md`.

## [0.4.0](https://github.com/abr4xas/node-instapago/tree/v0.4.0) - 2015-11-05

### Nuevo

* Se reescribió la clase `Instapago` a Javascript ES2015 (ES6).
* Se especificó una limitante del API en `DOCUMENTACION.md`.

### Cambiado

* Se cambiaron las insignias del `README.md`.

## [0.3.0](https://github.com/abr4xas/node-instapago/tree/v0.3.0) - 2015-10-24

### Nuevo

* Se reescribió el código a Javascript ES2015 (ES6).
* Éste documento, así como `AUTORES.md`, `CONTRIBUCION.md` y `.npmignore`.

### Cambiado

* Se simplificó el contenido de `README.md`. Asimismo, se actualizó el ejemplo a ES6.
* Se actualizó el contenido de `DOCUMENTACION.md`.

### Removido

* Se eliminó el archivo `CHANGELOG`.

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
