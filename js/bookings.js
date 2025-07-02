



document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("To view orders, you must be logged in.");
    window.location.href = "login.html";
    return;
  }

  const key = `${currentUser.username}_bookings`;
  const bookings = JSON.parse(localStorage.getItem(key) || "[]");
  const listings = window.amsterdam || [];
  const container = document.getElementById("bookingsGrid");

  if (bookings.length === 0) {
    container.innerHTML = `<div class="no-bookings">No bookings found</div>`;
    return;
  }

  const today = new Date().toISOString().split("T")[0]; // תאריך של היום בפורמט yyyy-mm-dd

  bookings.forEach((b, index) => {
    const property = listings.find(p => p.listing_id == b.listing_id);
    if (!property) return;

    const isPast = b.checkOut < today;
    const statusText = isPast ? "Past" : "Upcoming";
    const statusColor = isPast ? "red" : "green";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${property.picture_url}" alt="${property.name}" />
      <h3>${property.name}</h3>
      <p><strong>Dates:</strong> ${b.checkIn || "—"} To ${b.checkOut || "—"}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p><strong>Status:</strong> <span style="color:${statusColor}">${statusText}</span></p>
      ${isPast
        ? `<button disabled style="opacity: 0.5; cursor: not-allowed;">Cancel Booking</button>`
        : `<button onclick="cancelBooking(${index})">Cancel Booking</button>`}
    `;
    container.appendChild(card);
  });
});

function cancelBooking(index) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const key = `${user.username}_bookings`;
  let bookings = JSON.parse(localStorage.getItem(key) || "[]");

  bookings.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(bookings));

  alert("Booking cancelled");
  location.reload();
}
