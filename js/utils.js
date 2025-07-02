// NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const navbarHTML = `
    <nav id="mainNav" class="navbar">
      <div class="nav-container">
        <a href="index.html" class="logo">Y&R</a>
        <button class="hamburger" id="hamburger">&#9776;</button>
        <ul class="nav-links" id="navLinks">
          <li><a href="index.html">Home</a></li>
          <li><a href="favorites.html">Favorites</a></li>
          <li><a href="mybookings.html">My Bookings</a></li>
          <li><a href="login.html" id="loginLink">Login</a></li>
          <li><a href="#" id="logoutLink" style="display: none;">Logout</a></li>
        </ul>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  function updateNavVisibility() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const loginLink = document.getElementById("loginLink");
    const logoutLink = document.getElementById("logoutLink");

    if (currentUser) {
      loginLink.style.display = "none";
      logoutLink.style.display = "inline";
      logoutLink.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        location.href = "index.html";
      });
    }
  }

  updateNavVisibility();
});



if (typeof amsterdam !== "undefined") {
  window.amsterdam = amsterdam;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getFavoritesKey() {
  const user = getCurrentUser();
  return user ? `${user.username}_favorites` : "guest_favorites";
}

function isFavorite(id) {
  const favorites = JSON.parse(localStorage.getItem(getFavoritesKey()) || "[]");
  return favorites.includes(id);
}

function createListingCard(apartment) {
  const favoritesKey = getFavoritesKey();
  const card = document.createElement("div");
  card.className = "listing-card";

  card.innerHTML = `
    <img src="${apartment.picture_url}" alt="${apartment.name}">
    <h3>${apartment.name}</h3>
    <p>${apartment.room_type || ""} / ${apartment.price} / ${apartment.bedrooms || 1} BedRooms</p>
    <p>Rating: ${apartment.review_scores_rating || "N/A"}</p>
    <button class="book-btn">Rent</button>
    <button class="fav-btn">${isFavorite(apartment.listing_id) ? "Remove from Favorites" : "Add to Favorites"}</button>
  `;

  card.querySelector(".book-btn").addEventListener("click", () => {
    if (!getCurrentUser()) {
      alert("You must be logged in to book an apartment");
      return;
    }
    window.location.href = `rent.html?id=${apartment.listing_id}`;
  });

  card.querySelector(".fav-btn").addEventListener("click", (e) => {
    if (!getCurrentUser()) {
      alert("You must be logged in to add to favorites");
      return;
    }

    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || "[]");
    const index = favorites.indexOf(apartment.listing_id);

    if (index > -1) {
      favorites.splice(index, 1);
      e.target.textContent = "Add to Favorites";
    } else {
      favorites.push(apartment.listing_id);
      e.target.textContent = "Remove from Favorites";
    }

    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  });

  return card;
}