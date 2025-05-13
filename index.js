const API_TOKEN = "yAZudpjLFanXUUfvmNvwrCIaqJeKudNrWrPEIywh";
const BASE_URL = "https://api.discogs.com/database/search";
const recordList = document.getElementById("recordList");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const sortSelect = document.getElementById("sortSelect");

let currentRecords = []; // ✅ Holds the current set of records for sorting/filtering

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

function displayRecords(records, sortBy = "") {
  if (sortBy === "newest") {
    records.sort((a, b) => (b.year || 0) - (a.year || 0));
  } else if (sortBy === "oldest") {
    records.sort((a, b) => (a.year || 0) - (b.year || 0));
  }

  recordList.innerHTML = "";

  if (records.length === 0) {
    recordList.innerHTML = "<p>No records found.</p>";
    return;
  }

  records.forEach((record) => {
    const card = document.createElement("div");
    card.className = "record-card";

    const price = (Math.random() * 100).toFixed(2); // Simulated price
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
  showSkeletons(); // Show loading skeletons
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&type=release&per_page=6&token=${API_TOKEN}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "VinylRecordApp/1.0",
      },
    });
    const data = await response.json();
    currentRecords = data.results; // ✅ Save results
    displayRecords(currentRecords, sortSelect.value); // ✅ Apply current sort
  } catch (error) {
    console.error("Error fetching records:", error);
    recordList.innerHTML = "<p>Failed to load records.</p>";
  }
}

// Search handler
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query !== "") {
    fetchRecords(query);
  }
});

// Sort dropdown handler
sortSelect.addEventListener("change", () => {
  displayRecords(currentRecords, sortSelect.value);
});

// Initial fetch
window.addEventListener("DOMContentLoaded", () => {
  fetchRecords("vinyl");
});
