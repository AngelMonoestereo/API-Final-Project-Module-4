console.log("record.js loaded");

const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('id');
const container = document.getElementById('recordDetail');
container.innerHTML = "<h2>Loading...</h2>";

if (recordId) {
  fetch(`https://api.discogs.com/releases/${recordId}`, {
    headers: {
      'User-Agent': 'VinylExplorerApp/1.0',
      'Authorization': 'Discogs token=yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh'
    }
  })
  .then(res => res.json())
  .then(data => {
  container.innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.images?.[0]?.uri}" alt="${data.title}" style="max-width: 300px;" />
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>Genres:</strong> ${data.genres?.join(', ')}</p>
    <p><strong>Year:</strong> ${data.year}</p>
  `;

  // 👇 Add this after rendering the record details
  container.innerHTML += `
    <br />
    <a href="index.html" style="display: inline-block; margin-top: 20px;">🔙 Back to search</a>
  `;
})
  // .then(data => {
  //   container.innerHTML = `
  //     <h2>${data.title}</h2>
  //     <img src="${data.images?.[0]?.uri}" alt="${data.title}" style="max-width: 300px;" />
  //     <p><strong>Country:</strong> ${data.country}</p>
  //     <p><strong>Genres:</strong> ${data.genres?.join(', ')}</p>
  //     <p><strong>Year:</strong> ${data.year}</p>
  //     <br />
  //     <a href="index.html" style="display: inline-block; margin-top: 20px;">🔙 Back to search</a>
  //   `;
  // })
  .catch(error => {
    console.error("Error loading record:", error);
    container.innerHTML = "<p>Failed to load record details. Please try again.</p>";
  });
}
// console.log("record.js loaded");

// const urlParams = new URLSearchParams(window.location.search);
// const recordId = urlParams.get('id');

// if (recordId) {
//   fetch(`https://api.discogs.com/releases/${recordId}`, {
//     headers: {
//       'User-Agent': 'VinylExplorerApp/1.0',
//       'Authorization': 'Discogs token=yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh'
//     }
//   })
//   .then(res => res.json())
//   .then(data => {
//     const container = document.getElementById('recordDetail');
//     container.innerHTML = `
//       <h2>${data.title}</h2>
//       <img src="${data.images?.[0]?.uri}" alt="${data.title}" style="max-width: 300px;" />
//       <p><strong>Country:</strong> ${data.country}</p>
//       <p><strong>Genres:</strong> ${data.genres?.join(', ')}</p>
//       <p><strong>Year:</strong> ${data.year}</p>
//     `;
//   });
// }
