console.log("record.js loaded");

const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id');

if (recordId) {
  fetch(`https://api.discogs.com/releases/${recordId}`, {
    headers: {
      'User-Agent': 'VinylExplorerApp/1.0',
      'Authorization': 'Discogs token=yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh'
    }
  })
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('recordDetail');
    container.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.images?.[0]?.uri}" alt="${data.title}" style="max-width: 300px;" />
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Genres:</strong> ${data.genres?.join(', ')}</p>
      <p><strong>Year:</strong> ${data.year}</p>
    `;
  });
}
