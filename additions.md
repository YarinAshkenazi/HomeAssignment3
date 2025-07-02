| Element / Feature                | JavaScript Code Example                                                                                   |
|----------------------------------|------------------------------------------------------------------------------------------------------------|
| Select Check-in field            | `const checkInInput = document.getElementById("checkIn");`                                                |
| Select Check-out field           | `const checkOutInput = document.getElementById("checkOut");`                                              |
| Get existing bookings            | `const bookings = getBookingsForListing(listingId);`                                                      |
| Generate list of unavailable dates | `const unavailableDates = bookings.flatMap(b => getDatesBetween(b.checkIn, b.checkOut));`              |
| Initialize flatpickr (Check-in)  | `flatpickr(checkInInput, { disable: unavailableDates, dateFormat: "Y-m-d" });`                           |
| Initialize flatpickr (Check-out) | `flatpickr(checkOutInput, { disable: unavailableDates, dateFormat: "Y-m-d" });`                          |
| Generate dates between two dates | `function getDatesBetween(start, end) { let arr = []; let dt = new Date(start); while (dt <= new Date(end)) { arr.push(new Date(dt).toISOString().split("T")[0]); dt.setDate(dt.getDate() + 1); } return arr; }` |


