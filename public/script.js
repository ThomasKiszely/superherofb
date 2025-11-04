const listEl = document.getElementById('list');
const listEl2 = document.getElementById('list2');
let currentPage = 1;
const pageSize = 10;
let allSuperHeroes = [];
let currentFavorites = [];

async function loadFavorites() {
    try {
        const res = await fetch('/favorites');
        if (!res.ok) {
            alert('Failed to fetch favorites: ' + res.status);
        }
        const favorites = await res.json();
        currentFavorites = favorites;
        console.log('Loaded favorites:', currentFavorites); // DEBUG
        renderFavorites(favorites);
        return favorites;
    } catch (error) {
        alert('Fejl ved hentning af favoritter: ' + error.message);
    }
}
async function loadSuperHeroes() {
    try {
        const res = await fetch('/superheroes');
        allSuperHeroes = await res.json();
        renderPage(currentPage);
    } catch (error) {
        alert('Fejl ved hentning af superheroes: ' + error.message);
    }
}

function renderPage(page) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageData = allSuperHeroes.slice(start, end);
    render(pageData);
    updatePaginationControls()
}
function updatePaginationControls() {
    const totalPage = Math.ceil(allSuperHeroes.length / pageSize);
    document.getElementById('pageInfo').textContent = `Side ${currentPage} af ${totalPage}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPage;
}
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    const totalPages = Math.ceil(allSuperHeroes.length / pageSize);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
    }
});
function render(data) {
    console.log('Render superheroes. Nuværende favoritter:', currentFavorites);
    const listBody = document.querySelector('#list tbody');
    listBody.innerHTML = '';

    for (const it of data) {
        const isFavorite = currentFavorites.some(fav => Number(fav.id) === Number(it.id));
        console.log(`Superhero ${it.name} (id: ${it.id}) - isFavorite: ${isFavorite}`); // DEBUG
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${it.name}</td>
        <td>${it.fullName}</td>
        <td>${it.strength}</td>
        <td><img src="${it.image}" alt="${it.name}" width="50"/></td>
        <td><input type="checkbox" /></td>
        `;
        const checkbox = row.querySelector('input');
        checkbox.checked = isFavorite;
        checkbox.addEventListener('change', () => setFavorite(it.id, checkbox.checked))
        listBody.appendChild(row);

    }
}

function renderFavorites(favorites) {
    const favBody = document.querySelector('#list2 tbody');
    const isFavorite = currentFavorites.some(fav => Number(fav.id) === Number(fav.id));
    favBody.innerHTML = '';
    for (const fav of favorites) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${fav.name}</td>
      <td>${fav.fullName}</td>
      <td>${fav.strength}</td>
      <td><img src="${fav.image}" alt="${fav.name}" width="50"/></td>
      <td>${fav.note || ''}</td>
      <td><input type="checkbox" /></td>
      `;
        const checkbox = row.querySelector('input');
        checkbox.checked = isFavorite;
        checkbox.addEventListener('change', () => setFavorite(fav.id, checkbox.checked))
        favBody.appendChild(row);
    }
}
async function setFavorite(id, status) {
    if (status) {
        const res = await fetch('/favorites/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, note: 'Den bedste superhero'}),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => {});
            alert('Kan ikke favorite' + (err.status || res.statusText));
            return;
        }
        const newFavorite = await res.json();
        console.log('Added til favoritter.', newFavorite);
        currentFavorites.push(newFavorite);
    } else {
        const res = await fetch(`/favorites/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const err = await res.json().catch(() => {});
            alert('Kan ikke slette favorite' + (err.status || res.statusText));
            return;
        }
        console.log('Slettet fra favoritter: ', id);
        currentFavorites = currentFavorites.filter(fav => Number(fav.id) !== Number(id));
    }
    await loadFavorites();
    await loadSuperHeroes();
    renderFavorites(currentFavorites);
}


async function start() {
    await loadFavorites();
    await loadSuperHeroes();
}
start();
