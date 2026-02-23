const form = document.getElementById("newsletter-form");
const feedback = document.getElementById("feedback");
const subscribersCount = document.getElementById("subscribers-count");
const downloadsCount = document.getElementById("downloads-count");
const searchInput = document.getElementById("search");
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".gallery-card");
const resultsCount = document.getElementById("results-count");
const modal = document.getElementById("preview-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");
const previewButtons = document.querySelectorAll(".preview-btn");
const downloadLinks = document.querySelectorAll(".download-link");

let activeFilter = "all";

function getSubscribers() {
  return JSON.parse(localStorage.getItem("garage-subscribers") || "[]");
}

function saveSubscribers(list) {
  localStorage.setItem("garage-subscribers", JSON.stringify(list));
  subscribersCount.textContent = list.length;
}

function updateResultsLabel() {
  const visibleCount = [...cards].filter((card) => !card.classList.contains("hidden")).length;
  resultsCount.textContent = `${visibleCount} wallpaper${visibleCount > 1 ? "s" : ""} encontrado${visibleCount > 1 ? "s" : ""}`;
}

function applyFilters() {
  const term = searchInput.value.toLowerCase().trim();

  cards.forEach((card) => {
    const matchesText = card.dataset.title.toLowerCase().includes(term);
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    card.classList.toggle("hidden", !(matchesText && matchesFilter));
  });

  updateResultsLabel();
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();

  if (!email || !email.includes("@")) {
    feedback.textContent = "Digite um e-mail válido para continuar.";
    feedback.classList.add("error");
    return;
  }

  const subscribers = getSubscribers();

  if (subscribers.includes(email.toLowerCase())) {
    feedback.textContent = "Este e-mail já está inscrito.";
    feedback.classList.add("error");
    return;
  }

  subscribers.push(email.toLowerCase());
  saveSubscribers(subscribers);
  feedback.textContent = "Cadastro concluído! Novos wallpapers chegarão no seu e-mail.";
  feedback.classList.remove("error");
  form.reset();
});

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".gallery-card");
    const image = card.querySelector("img");
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modal.classList.remove("hidden");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

downloadLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const current = Number(downloadsCount.textContent.replace(/\D/g, "")) || 0;
    downloadsCount.textContent = (current + 1).toLocaleString("pt-BR");
  });
});

saveSubscribers(getSubscribers());
applyFilters();
