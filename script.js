const API_BASE = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let selectedSpecies = '';
let selectedStatus = '';
let totalPages = 1;

document.addEventListener('DOMContentLoaded', async () => {
    await renderCharacters();
    setupThemeToggle();
    setupPagination();
    await setupMenu();
    await loadHeroImages();
});

// Fetch personajes con filtros y página
async function fetchCharacters(page = 1) {
    const url = `${API_BASE}/?page=${page}&species=${selectedSpecies}&status=${selectedStatus}`;
    const res = await fetch(url);
    const data = await res.json();
    totalPages = data.info?.pages || 1;
    return data.results || [];
}

// Renderiza las cards
async function renderCharacters() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    const characters = await fetchCharacters(currentPage);

    characters.forEach((char) => {
        const card = document.createElement('div');
        card.className = `
      bg-gradient-to-tr from-blue-500 to-green-800
      dark:from-gray-800 dark:to-gray-900
      rounded-xl shadow-lg p-4 text-white font-semibold
      border-2 border-green-300
      hover:scale-105 transform transition-transform duration-300
    `;

        card.innerHTML = `
      <img src="${char.image}" alt="${char.name}" class="w-full h-48 object-cover rounded-t-xl mb-4" />
      <h2 class="text-center text-lg font-bold">${char.name}</h2>
      <div class="text-left text-sm mt-2">
        <p>ID: ${char.id}</p>
        <p>Tipo: ${char.species}</p>
        <p>Estado: ${char.status}</p>
      </div>
    `;
        container.appendChild(card);
    });
}

// Toggle tema claro/oscuro
function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        toggle.innerHTML = document.body.classList.contains('dark')
            ? `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="m7.4 3.736 3.43 3.429A5.046 5.046 0 0 1 12.133 7c.356.01.71.06 1.056.147l3.41-3.412a2.32 2.32 0 0 1 .451-.344A9.89 9.89 0 0 0 12.268 2a10.022 10.022 0 0 0-5.322 1.392c.165.095.318.211.454.344Zm11.451 1.54-.127-.127a.5.5 0 0 0-.706 0l-2.932 2.932c.03.023.05.054.078.077.237.194.454.41.651.645.033.038.077.067.11.107l2.926-2.927a.5.5 0 0 0 0-.707Zm-2.931 9.81c-.025.03-.058.052-.082.082a4.97 4.97 0 0 1-.633.639c-.04.036-.072.083-.115.117l2.927 2.927a.5.5 0 0 0 .707 0l.127-.127a.5.5 0 0 0 0-.707l-2.932-2.931Zm-1.443-4.763a3.037 3.037 0 0 0-1.383-1.1l-.012-.007a2.956 2.956 0 0 0-1-.213H12a2.964 2.964 0 0 0-2.122.893c-.285.29-.509.634-.657 1.013l-.009.016a2.96 2.96 0 0 0-.21 1 2.99 2.99 0 0 0 .488 1.716l.032.04a3.04 3.04 0 0 0 1.384 1.1l.012.007c.319.129.657.2 1 .213.393.015.784-.05 1.15-.192.012-.005.021-.013.033-.018a3.01 3.01 0 0 0 1.676-1.7v-.007a2.89 2.89 0 0 0 0-2.207 2.868 2.868 0 0 0-.27-.515c-.007-.012-.02-.025-.03-.039Zm6.137-3.373a2.53 2.53 0 0 1-.349.447l-3.426 3.426c.112.428.166.869.161 1.311a4.954 4.954 0 0 1-.148 1.054l3.413 3.412c.133.134.249.283.347.444A9.88 9.88 0 0 0 22 12.269a9.913 9.913 0 0 0-1.386-5.319ZM16.6 20.264l-3.42-3.421c-.386.1-.782.152-1.18.157h-.135c-.356-.01-.71-.06-1.056-.147L7.4 20.265a2.503 2.503 0 0 1-.444.347A9.884 9.884 0 0 0 11.732 22H12a9.9 9.9 0 0 0 5.044-1.388 2.515 2.515 0 0 1-.444-.348ZM3.735 16.6l3.426-3.426a4.608 4.608 0 0 1-.013-2.367L3.735 7.4a2.508 2.508 0 0 1-.349-.447 9.889 9.889 0 0 0 0 10.1 2.48 2.48 0 0 1 .35-.453Zm5.101-.758a4.959 4.959 0 0 1-.65-.645c-.034-.038-.078-.067-.11-.107L5.15 18.017a.5.5 0 0 0 0 .707l.127.127a.5.5 0 0 0 .706 0l2.932-2.933c-.029-.018-.049-.053-.078-.076Zm-.755-6.928c.03-.037.07-.063.1-.1.183-.22.383-.423.6-.609.046-.04.081-.092.128-.13L5.983 5.149a.5.5 0 0 0-.707 0l-.127.127a.5.5 0 0 0 0 .707l2.932 2.931Z"/>
</svg>`
            : `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="... (aquí el path del otro icono) ..."/>
</svg>`;
    });
}

// Paginación
function setupPagination() {
    document.getElementById('sig').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCharacters();
        }
    });

    document.getElementById('ant').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCharacters();
        }
    });
}

// Carga imagen logo y hero desde API
async function loadHeroImages() {
    const res = await fetch(`${API_BASE}/2`);
    const data = await res.json();
    document.getElementById('logo-img').src = data.image;
    document.getElementById('hero-img').src = data.image;
}

// Menú con dropdowns que abren/cerran con click y filtran
async function setupMenu() {
    const header = document.querySelector('header');

    const menuContainer = document.createElement('nav');
    menuContainer.id = 'dropdown-container';
    menuContainer.className =
        'absolute md:static bg-white dark:bg-gray-900 z-10 left-0 right-0 top-16 md:top-0 flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 hidden md:flex';

    const dropdowns = [
        { label: 'Especie', values: ['Human', 'Alien', 'Humanoid', 'Robot'] },
        { label: 'Estado', values: ['Alive', 'Dead', 'unknown'] },
    ];

    dropdowns.forEach(({ label, values }) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative';

        const button = document.createElement('button');
        button.textContent = label;
        button.type = 'button';
        button.className =
            'px-4 py-2  text-white rounded-md hover: bg-gradient-to-tr from-green-200 to-blue-2000';

        const list = document.createElement('ul');
        list.className =
            'absolute left-0 mt-2 bg-white dark:bg-gray-700 text-dark dark:text-white rounded-md shadow-md hidden z-10 min-w-[120px]';

        values.forEach((val) => {
            const li = document.createElement('li');
            li.textContent = val;
            li.className =
                'px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-800 cursor-pointer';
            li.addEventListener('click', () => {
                if (label === 'Especie') selectedSpecies = val;
                if (label === 'Estado') selectedStatus = val;
                currentPage = 1;
                renderCharacters();
                list.classList.add('hidden'); // Ocultar dropdown tras selección
            });
            list.appendChild(li);
        });

        wrapper.appendChild(button);
        wrapper.appendChild(list);
        menuContainer.appendChild(wrapper);

        // Toggle dropdown con click
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = list.classList.contains('hidden');
            // Cierra todos los dropdowns abiertos
            document.querySelectorAll('#dropdown-container ul').forEach((ul) => {
                ul.classList.add('hidden');
            });
            if (isHidden) {
                list.classList.remove('hidden');
            } else {
                list.classList.add('hidden');
            }
        });
    });

    header.appendChild(menuContainer);

    // Botón hamburguesa móvil
    const btnMenu = document.getElementById('btn-menu');
    btnMenu.addEventListener('click', () => {
        menuContainer.classList.toggle('hidden');
    });

    // Cierra dropdowns si haces click fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('#dropdown-container ul').forEach((ul) => {
            ul.classList.add('hidden');
        });
    });
}
