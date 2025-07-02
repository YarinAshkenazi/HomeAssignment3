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