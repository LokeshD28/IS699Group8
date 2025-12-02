// ---------- CONFIG ----------
const API_BASE = "http://localhost:4000"; // change when you deploy backend

// ---------- MOCK FLIGHT DATA ----------
const flights = [
  // LAX routes
  {
    id: "LC100",
    airline: "AeroConnect",
    originCity: "Los Angeles",
    originCode: "LAX",
    destinationCity: "New York",
    destinationCode: "JFK",
    departureDate: "2025-12-01",
    departureTime: "08:00",
    arrivalTime: "16:00",
    duration: "8h 0m",
    basePrice: 450,
    discountPercent: 25,
    availableSeats: 12,
  },
  {
    id: "LC101",
    airline: "CloudAir",
    originCity: "Los Angeles",
    originCode: "LAX",
    destinationCity: "Chicago",
    destinationCode: "ORD",
    departureDate: "2025-12-02",
    departureTime: "10:30",
    arrivalTime: "15:00",
    duration: "4h 30m",
    basePrice: 260,
    discountPercent: 30,
    availableSeats: 8,
  },
  {
    id: "LC102",
    airline: "SkyWings",
    originCity: "Los Angeles",
    originCode: "LAX",
    destinationCity: "London",
    destinationCode: "LHR",
    departureDate: "2025-12-03",
    departureTime: "18:45",
    arrivalTime: "13:00",
    duration: "10h 15m",
    basePrice: 860,
    discountPercent: 35,
    availableSeats: 20,
  },

  // JFK routes
  {
    id: "LC200",
    airline: "FastJet",
    originCity: "New York",
    originCode: "JFK",
    destinationCity: "Los Angeles",
    destinationCode: "LAX",
    departureDate: "2025-12-01",
    departureTime: "09:15",
    arrivalTime: "12:15",
    duration: "6h 0m",
    basePrice: 390,
    discountPercent: 30,
    availableSeats: 10,
  },
  {
    id: "LC201",
    airline: "AeroConnect",
    originCity: "New York",
    originCode: "JFK",
    destinationCity: "London",
    destinationCode: "LHR",
    departureDate: "2025-12-04",
    departureTime: "21:00",
    arrivalTime: "09:30",
    duration: "7h 30m",
    basePrice: 720,
    discountPercent: 20,
    availableSeats: 5,
  },
  {
    id: "LC202",
    airline: "SkyWings",
    originCity: "New York",
    originCode: "JFK",
    destinationCity: "Paris",
    destinationCode: "CDG",
    departureDate: "2025-12-05",
    departureTime: "19:30",
    arrivalTime: "08:40",
    duration: "8h 10m",
    basePrice: 680,
    discountPercent: 30,
    availableSeats: 14,
  },

  // Chicago (ORD)
  {
    id: "LC300",
    airline: "CloudAir",
    originCity: "Chicago",
    originCode: "ORD",
    destinationCity: "Los Angeles",
    destinationCode: "LAX",
    departureDate: "2025-12-02",
    departureTime: "07:45",
    arrivalTime: "10:15",
    duration: "4h 30m",
    basePrice: 240,
    discountPercent: 25,
    availableSeats: 18,
  },
  {
    id: "LC301",
    airline: "FastJet",
    originCity: "Chicago",
    originCode: "ORD",
    destinationCity: "Miami",
    destinationCode: "MIA",
    departureDate: "2025-12-03",
    departureTime: "12:00",
    arrivalTime: "16:10",
    duration: "4h 10m",
    basePrice: 210,
    discountPercent: 30,
    availableSeats: 9,
  },
  {
    id: "LC302",
    airline: "AeroConnect",
    originCity: "Chicago",
    originCode: "ORD",
    destinationCity: "London",
    destinationCode: "LHR",
    departureDate: "2025-12-04",
    departureTime: "17:30",
    arrivalTime: "08:00",
    duration: "8h 30m",
    basePrice: 780,
    discountPercent: 30,
    availableSeats: 7,
  },

  // International: London hub
  {
    id: "LC400",
    airline: "SkyWings",
    originCity: "London",
    originCode: "LHR",
    destinationCity: "Paris",
    destinationCode: "CDG",
    departureDate: "2025-12-02",
    departureTime: "09:05",
    arrivalTime: "10:30",
    duration: "1h 25m",
    basePrice: 120,
    discountPercent: 25,
    availableSeats: 16,
  },
  {
    id: "LC401",
    airline: "CloudAir",
    originCity: "London",
    originCode: "LHR",
    destinationCity: "Dubai",
    destinationCode: "DXB",
    departureDate: "2025-12-03",
    departureTime: "20:15",
    arrivalTime: "06:00",
    duration: "6h 45m",
    basePrice: 610,
    discountPercent: 30,
    availableSeats: 11,
  },
  {
    id: "LC402",
    airline: "FastJet",
    originCity: "London",
    originCode: "LHR",
    destinationCity: "Singapore",
    destinationCode: "SIN",
    departureDate: "2025-12-05",
    departureTime: "22:30",
    arrivalTime: "18:10",
    duration: "12h 40m",
    basePrice: 950,
    discountPercent: 35,
    availableSeats: 6,
  },

  // Asia routes
  {
    id: "LC500",
    airline: "AeroConnect",
    originCity: "Singapore",
    originCode: "SIN",
    destinationCity: "Tokyo",
    destinationCode: "HND",
    departureDate: "2025-12-03",
    departureTime: "08:20",
    arrivalTime: "15:00",
    duration: "6h 40m",
    basePrice: 430,
    discountPercent: 25,
    availableSeats: 13,
  },
  {
    id: "LC501",
    airline: "SkyWings",
    originCity: "Tokyo",
    originCode: "HND",
    destinationCity: "Los Angeles",
    destinationCode: "LAX",
    departureDate: "2025-12-04",
    departureTime: "17:45",
    arrivalTime: "10:05",
    duration: "9h 20m",
    basePrice: 880,
    discountPercent: 30,
    availableSeats: 10,
  },
  {
    id: "LC502",
    airline: "CloudAir",
    originCity: "Dubai",
    originCode: "DXB",
    destinationCity: "Singapore",
    destinationCode: "SIN",
    departureDate: "2025-12-06",
    departureTime: "01:10",
    arrivalTime: "10:00",
    duration: "6h 50m",
    basePrice: 540,
    discountPercent: 25,
    availableSeats: 15,
  },

  // Extra random short-haul
  {
    id: "LC600",
    airline: "FastJet",
    originCity: "San Francisco",
    originCode: "SFO",
    destinationCity: "Seattle",
    destinationCode: "SEA",
    departureDate: "2025-12-02",
    departureTime: "13:15",
    arrivalTime: "15:00",
    duration: "1h 45m",
    basePrice: 150,
    discountPercent: 20,
    availableSeats: 9,
  },
  {
    id: "LC601",
    airline: "AeroConnect",
    originCity: "San Francisco",
    originCode: "SFO",
    destinationCity: "New York",
    destinationCode: "JFK",
    departureDate: "2025-12-03",
    departureTime: "06:40",
    arrivalTime: "15:00",
    duration: "7h 20m",
    basePrice: 420,
    discountPercent: 30,
    availableSeats: 12,
  },
];

function generateMockFlights(fromCityRaw, toCityRaw, date) {
  const fromCity =
    fromCityRaw.charAt(0).toUpperCase() + fromCityRaw.slice(1);
  const toCity = toCityRaw.charAt(0).toUpperCase() + toCityRaw.slice(1);

  const airlines = ["AeroConnect", "CloudAir", "SkyWings", "FastJet"];
  const basePrices = [220, 340, 460];
  const times = ["06:30", "12:15", "19:45"];
  const durations = ["3h 10m", "5h 25m", "8h 40m"];

  const results = [];

  for (let i = 0; i < 3; i++) {
    results.push({
      id: `LCX${Math.floor(Math.random() * 900 + 100)}`,
      airline: airlines[i % airlines.length],
      originCity: fromCity,
      originCode: fromCity.slice(0, 3).toUpperCase(),
      destinationCity: toCity,
      destinationCode: toCity.slice(0, 3).toUpperCase(),
      departureDate: date,
      departureTime: times[i],
      arrivalTime: "", // we can leave empty for now or add fake
      duration: durations[i],
      basePrice: basePrices[i],
      discountPercent: 25 + i * 5,
      availableSeats: 5 + i * 4,
    });
  }

  return results;
}

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

    const fromInput = $("#searchFrom").value.trim();
    const toInput = $("#searchTo").value.trim();
    const date = $("#searchDate").value; // YYYY-MM-DD or ""

    const from = fromInput.toLowerCase();
    const to = toInput.toLowerCase();

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

    if (filtered.length > 0) {
      // We found real flights from the static database
      renderDeals(filtered);
    } else if (from && to && date) {
      // No real flights → generate mock flights for the user’s search
      const dynamicFlights = generateMockFlights(fromInput, toInput, date);
      renderDeals(dynamicFlights);
    } else {
      // Not enough info and no matches → show nothing / message
      renderDeals([]);
    }
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
