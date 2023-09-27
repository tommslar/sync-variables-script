const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

// Ruta al archivo SCSS generado por Figma
const figmaScssFile = '../_figma.scss';

// Ruta al repositorio Git
const gitRepoPath = '../figma variables sync';

// Copiar el archivo SCSS a la carpeta del repositorio Git
const destinationPath = path.join(gitRepoPath, '/_figma.scss');
fs.copyFileSync(figmaScssFile, destinationPath);

// Inicializar un objeto Git
const git = simpleGit(gitRepoPath);

// Agregar el archivo copiado al seguimiento de Git
git.add(['./_figma.scss'], (err) => {
  if (err) {
    console.error('Error al agregar el archivo a Git:', err);
  } else {
    // Realizar un commit con un mensaje
    git.commit('Agregado archivo SCSS de design tokens desde Figma', (commitErr) => {
      if (commitErr) {
        console.error('Error al hacer commit en Git:', commitErr);
      } else {
        console.log('Cambios guardados en Git');
      }
    });
  }
});