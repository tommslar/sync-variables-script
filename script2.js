const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const readline = require('readline-sync');

// Solicitar la URL del repositorio externo
//const externalRepoUrl = readline.question('Ingrese la URL del repositorio externo: ');

// Solicitar la ruta local donde clonar el repositorio externo
//const localRepoPath = readline.question('Ingrese la ruta local donde clonar el repositorio externo: ');


// Ruta al repositorio externo
const externalRepoUrl = 'https://github.com/tommslar/figma-variables-test.git';

// Ruta local donde clonar el repositorio externo
const localRepoPath = '../pegado';

// Nombre de la rama en la que trabajar
const branchName = 'main';

// Función para clonar el repositorio externo
const cloneExternalRepository = async () => {
    const git = simpleGit();
  
    // Verificar si el directorio local ya existe
    if (!fs.existsSync(localRepoPath)) {
      try {
        await git.clone(externalRepoUrl, localRepoPath);
        console.log('Repositorio externo clonado con éxito.');
      } catch (err) {
        console.error('Error al clonar el repositorio externo:', err);
      }
    } else {
      console.log('El repositorio externo ya está clonado en:', localRepoPath);
    }
};

// Función para hacer cambios en el repositorio clonado
const makeChanges = () => {
  // Realiza las modificaciones necesarias en el repositorio clonado

    // Ruta al archivo SCSS generado por Figma
    const figmaScssFile2 = './figma2.scss';

    // Ruta al repositorio Git
    const gitRepoPath = '../pegado/custom_scss';

    // Copiar el archivo SCSS a la carpeta del repositorio Git
    const destinationPath = path.join(gitRepoPath, '/_figma.scss');
    fs.copyFileSync(figmaScssFile2, destinationPath);
};

// Función para hacer commit y push de los cambios
const commitAndPushChanges = async () => {
  const git = simpleGit(localRepoPath);

  try {
    // Agregar los cambios al área de preparación
    await git.add('.');
    
    // Realizar un commit con un mensaje descriptivo
    await git.commit('Cambios automatizados');

    // Empujar los cambios al repositorio externo en la rama especificada
    await git.push('origin', branchName);
    
    console.log('Cambios commitados y empujados con éxito.');
  } catch (err) {
    console.error('Error al hacer commit y push de los cambios:', err);
  }
};

// Ejecuta el flujo completo
const run = async () => {
//preguntar si el directorio ya existe
  await cloneExternalRepository();
  makeChanges(); // Llama a la función para realizar cambios
  await commitAndPushChanges();
};

// Inicia el flujo
run();