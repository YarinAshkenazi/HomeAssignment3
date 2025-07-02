

document.addEventListener("DOMContentLoaded", () => {
  const listings = window.amsterdam || [];
  const container = document.getElementById("listings");
  const form = document.getElementById("filterForm");
  const countEl = document.getElementById("listingCount");

  function render(filteredListings) {
    container.innerHTML = "";

    countEl.textContent = `Showing ${filteredListings.length} listings`;

    if (filteredListings.length === 0) {
      container.innerHTML = "<p>No matching listings found.</p>";
      return;
    }

    filteredListings.forEach(ap => {
      const card = createListingCard(ap);
      container.appendChild(card);
    });
  }

  render(listings);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const minRating = parseFloat(form.minRating.value) || 0;
    const minPrice = parseFloat(form.minPrice.value) || 0;
    const maxPrice = parseFloat(form.maxPrice.value) || Infinity;
    const bedrooms = form.bedrooms.value;

    const filtered = listings.filter(ap => {
      const price = parseFloat(ap.price.replace("$", ""));
      const rating = parseFloat(ap.review_scores_rating) || 0;
      const beds = parseInt(ap.bedrooms) || 1;

      return (
        rating >= minRating &&
        price >= minPrice &&
        price <= maxPrice &&
        (bedrooms === "" || (bedrooms === "3" ? beds >= 3 : beds == bedrooms))
      );
    });

    render(filtered);
  });
});

