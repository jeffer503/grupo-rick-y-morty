
  let paginaActual = 'https://rickandmortyapi.com/api/character';

  const btnSig = document.getElementById('sig'); 
  const btnAnt = document.getElementById('ant'); 

  async function cargarPersonajes(url) {// funcion para cargar personajes
    const res = await fetch(url);
    const data = await res.json();

    const contenedor = document.getElementById('cards-container');//limpia las card para pasar a la siguiente funcion
    contenedor.innerHTML = '';

data.results.slice(0, 6).forEach(personaje => {
  const card = document.createElement('div');
  card.className = 'bg-white rounded-lg shadow p-2 text-center';
  card.innerHTML = `
    <img src="${personaje.image}" alt="${personaje.name}" class="w-full h-48 object-cover rounded-lg">
    <h3 class="text-lg font-semibold mt-2 text-black">${personaje.name}</h3>
  `;
  contenedor.appendChild(card);
});

    // Actualizar URLs en botones
    btnSig.dataset.url = data.info.next;
    btnAnt.dataset.url = data.info.prev;

    // Deshabilitar botones si no hay más páginas
    btnSig.disabled = !data.info.next;
    btnAnt.disabled = !data.info.prev;
  }

  // Eventos para los botones
  btnSig.addEventListener('click', () => {
    if (btnSig.dataset.url) {
      cargarPersonajes(btnSig.dataset.url);
    }
  });

  btnAnt.addEventListener('click', () => {
    if (btnAnt.dataset.url) {
      cargarPersonajes(btnAnt.dataset.url);
    }
  });

  // Cargar primera página
  cargarPersonajes(paginaActual);

