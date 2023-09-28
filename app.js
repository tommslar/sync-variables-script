const express = require('express');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Para gestionar la carga de archivos


const app = express();
const port = 3000;
const localPath = './storage_repo';

// Configura Multer para gestionar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define el directorio de destino para los archivos subidos
    const uploadDir = path.join(__dirname, 'storage_file');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo en el servidor
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clone', upload.single('file'), async (req, res) => {
  const repoUrl  = req.body.repoUrl;
  const git = simpleGit();

  // Clonar repositorio
  if (!fs.existsSync(localPath)) {
    try {
      await git.clone(repoUrl, localPath);
        console.log('Repositorio externo clonado con éxito.')
    } catch (err) {
      res.status(500).send('Error al clonar el repositorio externo: ' + err.message);
    }
  } else {
      console.log('El repositorio externo ya está clonado en: ' + localPath);
  }

  // Hacer cambios en el repositorio clonado (localPath)

  // Sub-Ruta al repositorio Git donde se debe reemplazar el archivo nuevo .scss
   const gitRepoPath = './storage_repo/custom_scss';
  
  // Copiar el archivo SCSS a la carpeta del repositorio Git
  const destinationPath = path.join(gitRepoPath, '/_figma.scss');
  fs.copyFileSync(req.file.path, destinationPath);

  // Commitear y pushear cambios del localPath al repoUrl
  const git2 = simpleGit(localPath);
  try {
    // Agregar los cambios al área de preparación
    await git2.add('.');
    
    // Realizar un commit con un mensaje descriptivo
    await git2.commit('Cambios automatizados');

    // Empujar los cambios al repositorio externo en la rama especificada
    await git2.push('origin', 'main');
    
    console.log('Cambios commitados y empujados con éxito.');
  } catch (err) {
    console.error('Error al hacer commit y push de los cambios:', err);
  }

  // Después de los procesos anteriores, envía el archivo HTML como respuesta
  res.sendFile(__dirname + '/response.html');

});


app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
