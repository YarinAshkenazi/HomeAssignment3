



document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You must be logged in to view your favorites");
    window.location.href = "login.html";
    return;
  }

  const favKey = `${currentUser.username}_favorites`;
  const favs = JSON.parse(localStorage.getItem(favKey) || "[]");
  const listings = window.amsterdam || [];
  const container = document.getElementById("favoritesGrid");

  if (favs.length === 0) {
    container.innerHTML = `<div class="no-fav">No favorites yet</div>`;
    return;
  }

  favs.forEach(id => {
    const ap = listings.find(l => l.listing_id.toString() === id.toString());
    if (!ap) return;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${ap.picture_url}" alt="${ap.name}">
      <h3>${ap.name}</h3>
      <p>${ap.price} Per Night / ${ap.accommodates} Guests / ${ap.bedrooms || 1} BedRooms</p>
      <button onclick="removeFromFavorites('${ap.listing_id}')">Remove from Favorites</button>
    `;
    container.appendChild(card);
  });
});

function removeFromFavorites(id) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const key = `${user.username}_favorites`;
  let favs = JSON.parse(localStorage.getItem(key) || "[]");

  favs = favs.filter(favId => favId.toString() !== id.toString());
  localStorage.setItem(key, JSON.stringify(favs));

  alert("Removed");
  location.reload(); 
}
