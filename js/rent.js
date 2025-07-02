




function isDateRangeOverlap(start1, end1, start2, end2) {
  return !(end1 < start2 || start1 > end2);
}

function checkAvailability(listingId, startDate, endDate) {
  const bookings = getBookingsForListing(listingId);
  return bookings.every(b => !isDateRangeOverlap(startDate, endDate, b.checkIn, b.checkOut));
}

function getBookingsForListing(listingId) {
  const booked = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.endsWith("_bookings")) continue;

    const bookings = JSON.parse(localStorage.getItem(key) || "[]");

    for (const booking of bookings) {
      if (booking.listing_id === listingId) {
        booked.push(booking);
      }
    }
  }

  return booked;
}

function getDisabledDateRanges(bookings) {
  return bookings.map(b => ({
    from: b.checkIn,
    to: b.checkOut
  }));
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("To place an order, you must log in.");
    window.location.href = "login.html";
    return;
  }

  const property = (window.amsterdam || []).find(
    (p) => p.listing_id.toString() === propertyId
  );
  const container = document.getElementById("propertyDetails");

  if (!property) {
    container.innerHTML = "<p>Order not found</p>";
    return;
  }

  container.innerHTML = `
    <img src="${property.picture_url}" alt="${property.name}" />
    <h2>${property.name}</h2>
    <p>${property.price} Per-Night</p>
    <p>${property.accommodates} Guests · ${property.bedrooms || 1} Bedroom</p>

    <h3>Payment Details</h3>
    <label for="cardName">Name on Card:</label>
    <input type="text" id="cardName" placeholder="John Doe" required />

    <label for="cardNumber">Card Number:</label>
    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required />

    <label for="expDate">Expiration Date:</label>
    <input type="month" id="expDate" required />

    <label for="cvv">CVV:</label>
    <input type="text" id="cvv" placeholder="123" required />

    <label for="checkIn">Check-in date:</label>
    <input type="text" id="checkIn" required />
    <label for="checkOut">Check-out date:</label>
    <input type="text" id="checkOut" required />
    
    <button id="bookBtn">Book Now</button>
  `;


  const bookings = getBookingsForListing(property.listing_id);
  const disabledRanges = getDisabledDateRanges(bookings);

  flatpickr("#checkIn", {
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: disabledRanges,
    onChange: function(selectedDates) {
      if (selectedDates.length) {
        const checkOut = document.getElementById("checkOut")._flatpickr;
        checkOut.set("minDate", selectedDates[0]);
      }
    }
  });

  flatpickr("#checkOut", {
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: disabledRanges
  });

  document
    .getElementById("bookBtn")
    .addEventListener("click", () => bookProperty(property.listing_id));
});

function bookProperty(id) {
  const checkIn = document.getElementById("checkIn").value;
  const checkOut = document.getElementById("checkOut").value;

  if (!checkIn || !checkOut) {
    alert("To book, please select dates");
    return;
  }

  if (!checkAvailability(id, checkIn, checkOut)) {
    alert("The selected dates are not available.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const key = `${user.username}_bookings`;
  const bookings = JSON.parse(localStorage.getItem(key) || "[]");

  bookings.push({ listing_id: id, checkIn, checkOut });
  localStorage.setItem(key, JSON.stringify(bookings));

  alert("Booking successful!");
  window.location.href = "mybookings.html";



}