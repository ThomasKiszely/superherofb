const listEl = document.getElementById('list');
const listEl2 = document.getElementById('list2');

async function loadSuperHeroes() {
    try {
        const res = await fetch('/superheroes');
        const data = await res.json();
        render(data);
    } catch (error) {
        alert('Fejl ved hentning af superheroes: ' + error.message);
    }
}

function render(data) {
    const listBody = document.querySelector('#list tbody');
    const favBody = document.querySelector('#list2 tbody');
    listBody.innerHTML = '';
    favBody.innerHTML = '';

    for (const it of data) {

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${it.name}</td>
        <td>${it.fullName}</td>
        <td>${it.strength}</td>
        <td>${it.image}</td>
        <td><input type="checkbox" ${it.id ? 'checked' : ''}</td>
        `;
        const checkbox = row.querySelector('input');
        checkbox.addEventListener('change', () => setFavorite(it.id, checkbox.checked))
        listBody.appendChild(row);


    }
}
async function setFavorite(id, status) {
    const res = await fetch(`/favorites/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ status }),
    });
    if(!res.ok) {
        const err = await res.json().catch(() => {});
        alert('Kan ikke favorite' + (err.status || res.statusText));
    }
}
loadSuperHeroes();