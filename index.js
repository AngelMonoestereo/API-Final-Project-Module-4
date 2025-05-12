const API_TOKEN = "yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh";
const BASE_URL = "https://api.discogs.com/database/search";
const recordList = document.getElementById("recordList");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");

function showSkeletons(count = 6) {
  recordList.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "record-card skeleton";
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    `;
    recordList.appendChild(skeleton);
  }
}

function displayRecords(records) {
  recordList.innerHTML = "";

  if (records.length === 0) {
    recordList.innerHTML = "<p>No records found.</p>";
    return;
  }

  records.forEach((record) => {
    const card = document.createElement("div");
    card.className = "record-card";

    const price = (Math.random() * 100).toFixed(2); // Fake price
    card.dataset.price = price;

    card.innerHTML = `
      <a href="record.html?id=${record.id}">
        <img src="${record.cover_image}" alt="${record.title}" />
        <h3>${record.title}</h3>
        <p>${record.year || "Unknown year"}</p>
        <p>$${price}</p>
      </a>
    `;
    recordList.appendChild(card);
  });
}

async function fetchRecords(query = "") {
  showSkeletons(); // Show loading
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&type=release&per_page=6&token=${API_TOKEN}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "VinylRecordApp/1.0",
      },
    });
    const data = await response.json();
    displayRecords(data.results);
  } catch (error) {
    console.error("Error fetching records:", error);
    recordList.innerHTML = "<p>Failed to load records.</p>";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchRecords(query);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  fetchRecords("vinyl");
});
