# Figma Variables Sync

Este es un proyecto simple de Node.js y Express que permite clonar un repositorio externo de github y subir un archivo local a dicho repositorio. 
Además, proporciona una interfaz web básica para realizar estas operaciones.


## Instalación

1. Tener instalado node.js.
2. Clonar este repositorio
3. Una vez dentro de la carpeta del proyecto, escribir en la terminal el comando: `npm install`.


## Correr Proyecto

Dentro del proyecto, escribir en la terminal comando: `node app.js`


## Roadmap

- Para abarcar más casos de uso, se debería agregar otro input solicitando la sub-ruta donde se encuentra el archivo .scss original que reemplazaremos (actualmente esa ruta está hardcodeada y solo funcionará para la ruta que definí para mi ejemplo)
- Transformar este proyecto en un plugin de Figma, para unificar la exportación de variables y este proceso de sincronización.
