// --------- MOCK DATA -------------

const flights = [
  {
    id: "EF530",
    airline: "AeroConnect",
    originCity: "Paris",
    originCode: "CDG",
    destinationCity: "Los Angeles",
    destinationCode: "LAX",
    departureDate: "2025-12-02",
    departureTime: "18:30",
    arrivalTime: "23:30",
    duration: "5h 0m",
    basePrice: 1104.0,
    discountPercent: 30,
    availableSeats: 16,
  },
  {
    id: "FJ220",
    airline: "FastJet",
    originCity: "Singapore",
    originCode: "SIN",
    destinationCity: "London",
    destinationCode: "LHR",
    departureDate: "2025-12-04",
    departureTime: "17:00",
    arrivalTime: "23:00",
    duration: "13h 0m",
    basePrice: 1023.0,
    discountPercent: 30,
    availableSeats: 9,
  },
  {
    id: "SA310",
    airline: "StarAviation",
    originCity: "Paris",
    originCode: "CDG",
    destinationCity: "Miami",
    destinationCode: "MIA",
    departureDate: "2025-12-03",
    departureTime: "11:15",
    arrivalTime: "17:00",
    duration: "9h 45m",
    basePrice: 933.0,
    discountPercent: 30,
    availableSeats: 5,
  },
  {
    id: "CA140",
    airline: "CloudAir",
    originCity: "Chicago",
    originCode: "ORD",
    destinationCity: "Singapore",
    destinationCode: "SIN",
    departureDate: "2025-12-03",
    departureTime: "09:45",
    arrivalTime: "22:15",
    duration: "16h 30m",
    basePrice: 181.0,
    discountPercent: 30,
    availableSeats: 20,
  },
  {
    id: "SW900",
    airline: "SkyWings",
    originCity: "Tokyo",
    originCode: "HND",
    destinationCity: "Paris",
    destinationCode: "CDG",
    departureDate: "2025-12-03",
    departureTime: "14:15",
    arrivalTime: "21:20",
    duration: "13h 5m",
    basePrice: 750.0,
    discountPercent: 30,
    availableSeats: 12,
  },
  {
    id: "CA555",
    airline: "CloudAir",
    originCity: "Chicago",
    originCode: "ORD",
    destinationCity: "London",
    destinationCode: "LHR",
    departureDate: "2025-12-03",
    departureTime: "09:45",
    arrivalTime: "22:00",
    duration: "8h 15m",
    basePrice: 1123.0,
    discountPercent: 30,
    availableSeats: 7,
  },
];

function discountedPrice(flight) {
  return +(flight.basePrice * (1 - flight.discountPercent / 100)).toFixed(2);
}

// Global state
let currentUser = null;
let selectedFlight = null;
let currentPassengers = 1;
let currentBooking = null;
let bookings = [];

// --------- HELPERS -------------

function $(selector) {
  return document.querySelector(selector);
}

function showPage(pageId) {
  const pages = [
    "loginPage",
    "homePage",
    "flightDetailsPage",
    "bookingPage",
    "paymentPage",
    "myBookingsPage",
  ];
  pages.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle("hidden", id !== pageId);
  });
}

function updateNav() {
  const navUser = $("#navUser");
  const navLogin = $("#navLogin");
  const navLogout = $("#navLogout");

  if (currentUser) {
    navUser.textContent = currentUser.email;
    navLogin.classList.add("hidden");
    navLogout.classList.remove("hidden");
  } else {
    navUser.textContent = "";
    navLogin.classList.remove("hidden");
    navLogout.classList.add("hidden");
  }
}

// --------- RENDER DEALS -------------

function renderDeals(list = flights) {
  const container = $("#dealsContainer");
  const noResults = $("#noResults");
  container.innerHTML = "";

  if (!list.length) {
    noResults.classList.remove("hidden");
    return;
  }

  noResults.classList.add("hidden");

  list.forEach((flight) => {
    const card = document.createElement("div");
    card.className = "deal-card";

    const newPrice = discountedPrice(flight);

    card.innerHTML = `
      <div class="deal-header">
        <div>
          <div class="deal-airline">${flight.airline}</div>
          <div class="deal-route">${flight.originCity} → ${
      flight.destinationCity
    }</div>
        </div>
        <span class="badge-sale">${flight.discountPercent}% OFF</span>
      </div>
      <div class="deal-meta">
        <span>📅 ${flight.departureDate}</span>
        <span>⏰ ${flight.departureTime}</span>
      </div>
      <div class="deal-footer">
        <div>
          <span class="old-price">$${flight.basePrice.toFixed(2)}</span>
          <span class="price">$${newPrice.toFixed(2)}</span>
        </div>
        <button class="btn-outline btn-view" data-id="${flight.id}">
          View Deal
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach click handlers
  container.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const flight = flights.find((f) => f.id === id);
      if (flight) {
        openFlightDetails(flight);
      }
    });
  });
}

// --------- FLIGHT DETAILS -------------

function openFlightDetails(flight) {
  selectedFlight = flight;

  $("#fdRoute").textContent = `${flight.originCity} → ${flight.destinationCity}`;
  $("#fdAirline").textContent = `${flight.airline} · ${flight.id}`;
  $("#fdDiscount").textContent = `${flight.discountPercent}% OFF`;

  $("#fdDepTime").textContent = flight.departureTime;
  $("#fdDepCity").textContent = flight.originCity;
  $("#fdDepDate").textContent = flight.departureDate;

  $("#fdArrTime").textContent = flight.arrivalTime;
  $("#fdArrCity").textContent = flight.destinationCity;
  $("#fdArrDate").textContent = flight.departureDate; // same day for demo

  $("#fdDuration").textContent = flight.duration;
  $("#fdSeats").textContent = flight.availableSeats;

  $("#fdOldPrice").textContent = `$${flight.basePrice.toFixed(2)}`;
  $("#fdNewPrice").textContent = `$${discountedPrice(flight).toFixed(2)}`;

  showPage("flightDetailsPage");
}

// --------- BOOKING -------------

function fillBookingSummary() {
  const flight = selectedFlight;
  const price = discountedPrice(flight);
  const total = price * currentPassengers;

  $("#bsRoute").textContent = `${flight.originCity} → ${flight.destinationCity}`;
  $("#bsAirline").textContent = flight.airline;
  $("#bsDate").textContent = flight.departureDate;
  $("#bsDeparture").textContent = flight.departureTime;
  $("#bsPassengers").textContent = currentPassengers;
  $("#bsPrice").textContent = `$${price.toFixed(2)}`;
  $("#bsTotal").textContent = `$${total.toFixed(2)}`;
}

function fillPaymentSummary() {
  const flight = selectedFlight;
  const price = discountedPrice(flight);
  const total = price * currentPassengers;

  $("#psRoute").textContent = `${flight.originCity} → ${flight.destinationCity}`;
  $("#psAirline").textContent = flight.airline;
  $("#psDate").textContent = flight.departureDate;
  $("#psDeparture").textContent = flight.departureTime;
  $("#psPassengers").textContent = currentPassengers;
  $("#psTotal").textContent = `$${total.toFixed(2)}`;
}

// --------- BOOKINGS LIST -------------

function renderBookings() {
  const container = $("#bookingsList");
  container.innerHTML = "";

  if (!bookings.length) {
    container.innerHTML =
      '<p class="section-subtitle">No bookings yet. Search and book a flight to see it here.</p>';
    return;
  }

  bookings.forEach((b) => {
    const div = document.createElement("div");
    div.className = "booking-item";

    div.innerHTML = `
      <div class="booking-left">
        <p><strong>Booking Ref:</strong> ${b.reference}</p>
        <p><strong>Route:</strong> ${b.flight.originCity} → ${
      b.flight.destinationCity
    }</p>
        <p><strong>Airline:</strong> ${b.flight.airline}</p>
        <p class="muted-text">
          ${b.flight.departureDate} · ${b.flight.departureTime}
        </p>
      </div>
      <div class="booking-right">
        <p><strong>Passenger:</strong> ${b.passenger.name}</p>
        <p class="muted-text">${b.passenger.email}</p>
        <p class="price">$${b.total.toFixed(2)}</p>
        <p class="muted-text">Status: confirmed</p>
      </div>
    `;

    container.appendChild(div);
  });
}

// --------- EVENT LISTENERS -------------

document.addEventListener("DOMContentLoaded", () => {
  // initial state
  showPage("loginPage");
  updateNav();
  renderDeals();

  // Login
  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim();
    const password = $("#loginPassword").value.trim();

    if (!email || !password) return;

    // Fake auth
    currentUser = { email };
    updateNav();
    showPage("homePage");
  });

  // Navbar actions
  $("#navLogin").addEventListener("click", () => {
    showPage("loginPage");
  });

  $("#navLogout").addEventListener("click", () => {
    currentUser = null;
    bookings = [];
    updateNav();
    showPage("loginPage");
  });

  $("#navHome").addEventListener("click", (e) => {
    e.preventDefault();
    if (currentUser) showPage("homePage");
    else showPage("loginPage");
  });

  $("#navBookings").addEventListener("click", (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to view bookings.");
      showPage("loginPage");
      return;
    }
    renderBookings();
    showPage("myBookingsPage");
  });

  // Search form
  $("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const from = $("#searchFrom").value.trim().toLowerCase();
    const to = $("#searchTo").value.trim().toLowerCase();
    const date = $("#searchDate").value;

    const filtered = flights.filter((f) => {
      const matchFrom = from
        ? f.originCity.toLowerCase().includes(from)
        : true;
      const matchTo = to
        ? f.destinationCity.toLowerCase().includes(to)
        : true;
      const matchDate = date ? f.departureDate === date : true;
      return matchFrom && matchTo && matchDate;
    });

    renderDeals(filtered);
  });

  // Back buttons
  $("#backToHome").addEventListener("click", () => showPage("homePage"));
  $("#backToDetails").addEventListener("click", () =>
    showPage("flightDetailsPage")
  );
  $("#backToBooking").addEventListener("click", () =>
    showPage("bookingPage")
  );

  // Book now
  $("#bookNowBtn").addEventListener("click", () => {
    if (!selectedFlight) return;
    currentPassengers = 1;
    fillBookingSummary();
    showPage("bookingPage");
  });

  // Booking form
  $("#bookingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#passengerName").value.trim();
    const email = $("#passengerEmail").value.trim();
    const phone = $("#passengerPhone").value.trim();
    const dob = $("#passengerDob").value;

    if (!name || !email) return;

    const flight = selectedFlight;
    const price = discountedPrice(flight);
    const total = price * currentPassengers;

    currentBooking = {
      flight,
      passenger: { name, email, phone, dob },
      total,
    };

    fillPaymentSummary();
    showPage("paymentPage");
  });

  // Payment form
  $("#paymentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentBooking) return;

    const reference = "U" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const bookingRecord = {
      ...currentBooking,
      reference,
    };

    bookings.push(bookingRecord);

    alert("Booking confirmed successfully!");
    renderBookings();
    showPage("myBookingsPage");
  });
});
