
/* ===== MOBILE NAVIGATION ===== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

/* ===== PACKAGE BOOKING BUTTONS ===== */
const destination = document.getElementById("destination");
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

document.querySelectorAll(".book-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPackage = button.dataset.package;

    const packageDestinations = {
      "Tropical Escape": "Bali",
      "Mountain Adventure": "Switzerland",
      "Luxury City Tour": "Dubai"
    };

    destination.value = packageDestinations[selectedPackage];

    document.getElementById("contact").scrollIntoView({
      behavior: "smooth"
    });

    document.getElementById("fullName").focus({
      preventScroll: true
    });

    formMessage.textContent =
      `${selectedPackage} selected. Complete the form to continue.`;
  });
});

/* ===== MINIMUM TRAVEL DATE ===== */
const travelDate = document.getElementById("travelDate");

function getLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

travelDate.min = getLocalDate();

/* ===== BOOKING FORM ===== */
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const name = document.getElementById("fullName").value.trim();
  const selectedDestination = destination.value;
  const date = travelDate.value;

  if (date < getLocalDate()) {
    formMessage.textContent = "Please choose today or a future date.";
    return;
  }

  formMessage.textContent =
    `Thank you, ${name}! Your trip request for ${selectedDestination} ` +
    `on ${date} has been prepared. This demo does not send a real booking.`;

  bookingForm.reset();
  travelDate.min = getLocalDate();
});

/* ===== AUTOMATIC FOOTER YEAR ===== */
document.getElementById("year").textContent =
  new Date().getFullYear();
