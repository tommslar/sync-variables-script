// Obtén elementos del DOM para Modal 1
const openModalLink = document.getElementById('openModalLink');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('myModal');

// Abre el modal cuando se hace clic en el enlace
openModalLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el enlace siga el href
    modal.style.display = 'block';
});

// Cierra el modal cuando se hace clic en la "X"
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Obtén elementos del DOM para Modal 2
const openModalLink2 = document.getElementById('openModalLink2');
const closeModalBtn2 = document.getElementById('closeModalBtn2');
const modal2 = document.getElementById('myModal2');

// Abre el modal cuando se hace clic en el enlace
openModalLink2.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el enlace siga el href
    modal2.style.display = 'block';
});

// Cierra el modal cuando se hace clic en la "X"
closeModalBtn2.addEventListener('click', () => {
    modal2.style.display = 'none';
});
