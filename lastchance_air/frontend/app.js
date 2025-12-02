// ---------- CONFIG ----------
const API_BASE = "http://localhost:4000"; // change when you deploy backend

// ---------- MOCK FLIGHT DATA ----------
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

// ---------- GLOBAL STATE ----------
let currentUser = null;
let selectedFlight = null;
let currentPassengers = 1;
let currentBooking = null;

// ---------- HELPERS ----------
function $(sel) {
  return document.querySelector(sel);
}

function showPage(id) {
  const pages = [
    "loginPage",
    "signupPage",
    "homePage",
    "flightDetailsPage",
    "bookingPage",
    "paymentPage",
    "myBookingsPage",
  ];
  pages.forEach((pid) => {
    const el = document.getElementById(pid);
    if (!el) return;
    el.classList.toggle("hidden", pid !== id);
  });
}

function updateNav() {
  const navUser = $("#navUser");
  const navLogin = $("#navLogin");
  const navSignup = $("#navSignup");
  const navLogout = $("#navLogout");

  // If navbar elements aren't there, just skip (prevents crash)
  if (!navUser || !navLogin || !navLogout) return;

  if (currentUser) {
    navUser.textContent = currentUser.email;
    navLogin.classList.add("hidden");
    if (navSignup) navSignup.classList.add("hidden");
    navLogout.classList.remove("hidden");
  } else {
    navUser.textContent = "";
    navLogin.classList.remove("hidden");
    if (navSignup) navSignup.classList.remove("hidden");
    navLogout.classList.add("hidden");
  }
}

// ---------- AUTOCOMPLETE SUGGESTIONS ----------
function buildCitySuggestions() {
  const originSet = new Set();
  const destSet = new Set();

  flights.forEach((f) => {
    originSet.add(f.originCity);
    destSet.add(f.destinationCity);
  });

  const originList = document.getElementById("originOptions");
  const destList = document.getElementById("destinationOptions");

  if (!originList || !destList) return; // safety if HTML not updated

  originSet.forEach((city) => {
    const opt = document.createElement("option");
    opt.value = city;
    originList.appendChild(opt);
  });

  destSet.forEach((city) => {
    const opt = document.createElement("option");
    opt.value = city;
    destList.appendChild(opt);
  });
}

// ---------- RENDER FLIGHTS ----------
function renderDeals(list = flights) {
  const container = $("#dealsContainer");
  const noResults = $("#noResults");
  if (!container) return;

  container.innerHTML = "";

  if (!list.length) {
    if (noResults) noResults.classList.remove("hidden");
    return;
  }
  if (noResults) noResults.classList.add("hidden");

  list.forEach((f) => {
    const card = document.createElement("div");
    card.className = "deal-card";
    const newPrice = discountedPrice(f);

    card.innerHTML = `
      <div class="deal-header">
        <div>
          <div class="deal-airline">${f.airline}</div>
          <div class="deal-route">${f.originCity} → ${f.destinationCity}</div>
        </div>
        <span class="badge-sale">${f.discountPercent}% OFF</span>
      </div>
      <div class="deal-meta">
        <span>📅 ${f.departureDate}</span>
        <span>⏰ ${f.departureTime}</span>
      </div>
      <div class="deal-footer">
        <div>
          <span class="old-price">$${f.basePrice.toFixed(2)}</span>
          <span class="price">$${newPrice.toFixed(2)}</span>
        </div>
        <button class="btn-outline btn-view" data-id="${f.id}">View Deal</button>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const flight = flights.find((x) => x.id === id);
      if (flight) openFlightDetails(flight);
    });
  });
}

function openFlightDetails(f) {
  selectedFlight = f;

  const fdRoute = $("#fdRoute");
  if (!fdRoute) return; // page not loaded? just bail

  $("#fdRoute").textContent = `${f.originCity} → ${f.destinationCity}`;
  $("#fdAirline").textContent = `${f.airline} · ${f.id}`;
  $("#fdDiscount").textContent = `${f.discountPercent}% OFF`;

  $("#fdDepTime").textContent = f.departureTime;
  $("#fdDepCity").textContent = f.originCity;
  $("#fdDepDate").textContent = f.departureDate;

  $("#fdArrTime").textContent = f.arrivalTime;
  $("#fdArrCity").textContent = f.destinationCity;
  $("#fdArrDate").textContent = f.departureDate;

  $("#fdDuration").textContent = f.duration;
  $("#fdSeats").textContent = f.availableSeats;

  $("#fdOldPrice").textContent = `$${f.basePrice.toFixed(2)}`;
  $("#fdNewPrice").textContent = `$${discountedPrice(f).toFixed(2)}`;

  showPage("flightDetailsPage");
}

// ---------- BOOKING SUMMARY ----------
function fillBookingSummary() {
  if (!selectedFlight) return;
  const f = selectedFlight;
  const price = discountedPrice(f);
  const total = price * currentPassengers;

  $("#bsRoute").textContent = `${f.originCity} → ${f.destinationCity}`;
  $("#bsAirline").textContent = f.airline;
  $("#bsDate").textContent = f.departureDate;
  $("#bsDeparture").textContent = f.departureTime;
  $("#bsPassengers").textContent = currentPassengers;
  $("#bsPrice").textContent = `$${price.toFixed(2)}`;
  $("#bsTotal").textContent = `$${total.toFixed(2)}`;
}

function fillPaymentSummary() {
  if (!selectedFlight) return;
  const f = selectedFlight;
  const price = discountedPrice(f);
  const total = price * currentPassengers;

  $("#psRoute").textContent = `${f.originCity} → ${f.destinationCity}`;
  $("#psAirline").textContent = f.airline;
  $("#psDate").textContent = f.departureDate;
  $("#psDeparture").textContent = f.departureTime;
  $("#psPassengers").textContent = currentPassengers;
  $("#psTotal").textContent = `$${total.toFixed(2)}`;
}

// ---------- BOOKINGS FROM BACKEND ----------
async function fetchBookings() {
  if (!currentUser) return [];
  const res = await fetch(`${API_BASE}/api/bookings/${currentUser.id}`);
  if (!res.ok) return [];
  return res.json();
}

async function renderBookings() {
  const container = $("#bookingsList");
  if (!container) return;

  container.innerHTML = `<p class="section-subtitle">Loading...</p>`;

  try {
    const rows = await fetchBookings();
    if (!rows.length) {
      container.innerHTML =
        '<p class="section-subtitle">No bookings yet. Book a flight to see it here.</p>';
      return;
    }

    container.innerHTML = "";
    rows.forEach((b) => {
      const div = document.createElement("div");
      div.className = "booking-item";

      div.innerHTML = `
        <div class="booking-left">
          <p><strong>Booking Ref:</strong> ${b.booking_ref}</p>
          <p><strong>Route:</strong> ${b.route}</p>
          <p><strong>Airline:</strong> ${b.airline}</p>
          <p class="muted-text">${b.departure_date} · ${b.departure_time}</p>
        </div>
        <div class="booking-right">
          <p><strong>Passenger:</strong> ${b.passenger_name}</p>
          <p class="muted-text">${b.passenger_email}</p>
          <p class="price">$${b.total_paid.toFixed(2)}</p>
          <p class="muted-text">Status: confirmed</p>
        </div>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="section-subtitle">Could not load bookings (backend offline?).</p>';
  }
}

// ---------- AUTH STORAGE ----------
function loadUserFromStorage() {
  const raw = localStorage.getItem("lastchanceUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveUserToStorage(user) {
  if (!user) localStorage.removeItem("lastchanceUser");
  else localStorage.setItem("lastchanceUser", JSON.stringify(user));
}

// ---------- MAIN ----------
document.addEventListener("DOMContentLoaded", () => {
  // initial state
  currentUser = loadUserFromStorage();
  updateNav();

  if (currentUser) {
    showPage("homePage");
  } else {
    showPage("loginPage");
  }

  renderDeals();
  buildCitySuggestions();

  // -------- NAV EVENTS --------
  const navLogin = $("#navLogin");
  const navSignup = $("#navSignup");
  const navHome = $("#navHome");
  const navBookings = $("#navBookings");
  const navLogout = $("#navLogout");

  if (navLogin) navLogin.addEventListener("click", () => showPage("loginPage"));
  if (navSignup) navSignup.addEventListener("click", () => showPage("signupPage"));
  if (navHome) {
    navHome.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentUser) showPage("homePage");
      else showPage("loginPage");
    });
  }
  if (navBookings) {
    navBookings.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!currentUser) {
        alert("Please login to view bookings.");
        showPage("loginPage");
        return;
      }
      await renderBookings();
      showPage("myBookingsPage");
    });
  }
  if (navLogout) {
    navLogout.addEventListener("click", () => {
      currentUser = null;
      saveUserToStorage(null);
      updateNav();
      showPage("loginPage");
    });
  }

  // Switch links between login/signup
  const loginToSignup = $("#loginToSignup");
  const signupToLogin = $("#signupToLogin");
  if (loginToSignup) {
    loginToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("signupPage");
    });
  }
  if (signupToLogin) {
    signupToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      showPage("loginPage");
    });
  }

  // -------- SIGNUP --------
  const signupForm = $("#signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#signupEmail").value.trim();
      const pw1 = $("#signupPassword").value;
      const pw2 = $("#signupPassword2").value;

      if (pw1 !== pw2) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pw1 }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(data.error || "Signup failed");
          return;
        }

        const user = await res.json();
        currentUser = user;
        saveUserToStorage(user);
        updateNav();
        showPage("homePage");
      } catch (err) {
        console.error(err);
        alert("Could not reach backend (signup).");
      }
    });
  }

  // -------- LOGIN --------
  const loginForm = $("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#loginEmail").value.trim();
      const password = $("#loginPassword").value;

      try {
        const res = await fetch(`${API_BASE}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(data.error || "Login failed");
          return;
        }

        const user = await res.json();
        currentUser = user;
        saveUserToStorage(user);
        updateNav();
        showPage("homePage");
      } catch (err) {
        console.error(err);
        alert("Could not reach backend (login).");
      }
    });
  }

  // -------- SEARCH --------
  const searchForm = $("#searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const from = $("#searchFrom").value.trim().toLowerCase();
      const to = $("#searchTo").value.trim().toLowerCase();
      const date = $("#searchDate").value; // YYYY-MM-DD or ""

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
  }

  // Back buttons
  const backToHome = $("#backToHome");
  const backToDetails = $("#backToDetails");
  const backToBooking = $("#backToBooking");

  if (backToHome) backToHome.addEventListener("click", () => showPage("homePage"));
  if (backToDetails)
    backToDetails.addEventListener("click", () =>
      showPage("flightDetailsPage")
    );
  if (backToBooking)
    backToBooking.addEventListener("click", () => showPage("bookingPage"));

  // Book now
  const bookNowBtn = $("#bookNowBtn");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      if (!currentUser) {
        alert("Please login before booking.");
        showPage("loginPage");
        return;
      }
      if (!selectedFlight) return;
      currentPassengers = 1;
      fillBookingSummary();
      showPage("bookingPage");
    });
  }

  // Booking form → go to payment
  const bookingForm = $("#bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#passengerName").value.trim();
      const email = $("#passengerEmail").value.trim();
      const phone = $("#passengerPhone").value.trim();
      const dob = $("#passengerDob").value;

      if (!name || !email) return;

      const f = selectedFlight;
      const price = discountedPrice(f);
      const total = price * currentPassengers;

      currentBooking = {
        passenger: { name, email, phone, dob },
        flight: f,
        total,
      };

      fillPaymentSummary();
      showPage("paymentPage");
    });
  }

  // Payment form → confirm booking (call backend)
  const paymentForm = $("#paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!currentBooking || !currentUser) return;

      const ref =
        "U" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const { flight, passenger, total } = currentBooking;

      const payload = {
        userId: currentUser.id,
        bookingRef: ref,
        route: `${flight.originCity} → ${flight.destinationCity}`,
        airline: flight.airline,
        departureDate: flight.departureDate,
        departureTime: flight.departureTime,
        passengerName: passenger.name,
        passengerEmail: passenger.email,
        totalPaid: total,
      };

      try {
        const res = await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          alert(data.error || "Could not save booking.");
          return;
        }

        alert("Booking confirmed successfully!");
        await renderBookings();
        showPage("myBookingsPage");
      } catch (err) {
        console.error(err);
        alert("Backend error while saving booking.");
      }
    });
  }
});
