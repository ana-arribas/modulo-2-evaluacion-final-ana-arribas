
En el ejercicio de evaluación se nos pide desarrollar una aplicación web de búsqueda de series de TV que permite marcar series como favoritas y guardarlas en una lista aparte y en local storage.
Para ello hemos utilizado el Starter Kit de Adalab para poder utilizar Node y Gulp. 
Consiste en un archivo de HTML, uno de CSS y uno de JS. Por la extensión del código no ha sido necesario utilizar parciales, aunque no se han borrado los archivos que no eran necesarios para evitar problemas con el repositorio. 
El repositorio tiene la carpeta /docs incluída y la página se encuentra publicada en GitHub pages en el siguiente enlace: http://beta.adalab.es/modulo-2-evaluacion-final-ana-arribas/


## Guía de inicio rápido
Necesitarás instalar [Node.js](https://nodejs.org/) y [Gulp](https://gulpjs.com) para trabajar con este repositorio, luego:
1. Descarga o clona el repositorio
2. Instala las dependencias locales con `npm install`
3. Arranca el kit con `gulp`

## Espera, ¿esto se hace siempre?
> ### Solo una vez al principio en cada ordenador que utilicemos:
- Instalamos node
- Instalamos el comando de gulp de forma global para poder usarlo desde cualquier carpeta usando `npm install --global gulp-cli`

> ### Cada vez que descarguemos o clonemos un repo:
- `npm install` para instalar los paquetes necesarios para convertir Sass a CSS, minizarlo, etc.

> ### Cada vez que estemos trabajando con nuestro código:
- Desde nuestra terminal, ejecutamos el comando `gulp` para que realice la tarea por defecto, que en el caso del `gulpfile.js` que tenemos en adalab-web-starter-kit estará pendiente de nuestros archivos Sass, html y JavaScript y los compilará, minificará y/o recargará el servidor cada vez que hagamos un cambio

