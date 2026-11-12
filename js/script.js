console.log("ElementLab Javascript is connected!");

const canvas = document.querySelector("#canvas-demo");
const ctx = canvas.getContext("2d");

let color = "#0f766e";
let isDrawing = false;

function drawDot(e) {
  const rect = canvas.getBoundingClientRect();

  ctx.fillStyle = color;
  ctx.beginPath();

  ctx.arc(
    ((e.clientX - rect.left) * canvas.width) / rect.width,
    ((e.clientY - rect.top) * canvas.height) / rect.height,
    3,
    0,
    10,
  );

  ctx.fill();
}

canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  drawDot(e);
});

canvas.addEventListener("pointermove", (e) => {
  if (isDrawing) {
    drawDot(e);
  }
});

window.addEventListener("pointerup", () => {
  isDrawing = false;
});

const colorButtons = document.querySelectorAll("[data-col]");

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    color = button.dataset.col;
  });
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const embed = document.querySelector("#embed-demo");

embed.src = "images/sample.png";

const object = document.querySelector("#object-demo");

object.data = "images/lavender.jpg";

customElements.define(
  "name-tag",
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.querySelector("#tpl");
      const shadow = this.attachShadow({ mode: "open" });

      shadow.append(template.content.cloneNode(true));
    }
  },
);

const addButton = document.querySelector("#add");
const nameInput = document.querySelector("#nm");
const tags = document.querySelector("#tags");

addButton.addEventListener("click", () => {
  const tag = document.createElement("name-tag");
  const name = document.createElement("span");

  name.slot = "who";
  name.textContent = nameInput.value || "?";

  tag.append(name);
  tags.append(tag);
});

const noscript = document.querySelector("noscript");
// const output = document.querySelector("#noscript-output");
const toggle = document.querySelector("#noscript-toggle");
const box = document.querySelector("#noscript-box");

// output.textContent = noscript.textContent.trim();

toggle.addEventListener("change", () => {
  box.innerHTML = toggle.checked ? noscript.textContent : "";
});

const rubyToggle = document.querySelector('#ruby-toggle');
const rubyDemo = document.querySelector('#rb');

rubyToggle.addEventListener('change', () => {
    rubyDemo.classList.toggle('nr', rubyToggle.checked);
});

// Geolocation
const status = document.querySelector('#gs');
const output = document.querySelector('#go');
const geolocationHolder = document.querySelector('#gh');

function showLocation(position) {
    output.textContent =
        'Latitude: ' + position.coords.latitude.toFixed(2) +
        ', Longitude: ' + position.coords.longitude.toFixed(2);
}

if ('HTMLGeolocationElement' in window) {
    // Use the experimental <geolocation> element
    const geo = document.createElement('geolocation');

    geo.setAttribute('autolocate', '');
    geolocationHolder.append(geo);

    status.textContent = 'Your browser supports the geolocation element.';

    geo.addEventListener('location', () => {
        if (geo.position) {
            showLocation(geo.position);
        } else if (geo.error) {
            output.textContent = geo.error.message;
        }
    });

} else {
    // Fallback for browsers without <geolocation>
    status.textContent =
        'Your browser does not support the experimental geolocation element. Using the older API instead.';

    const button = document.createElement('button'); 
    button.textContent = 'Share my location';

    button.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                showLocation,
                error => {
                    output.textContent = error.message;
                }
            );
        } else {
            output.textContent = 'Geolocation is not available.';
        }
    });

    geolocationHolder.append(button);
}

// Element search
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#element-search');
const elementCards = document.querySelectorAll('.element-card');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase().trim();

    elementCards.forEach((card) => {
        const cardText = card.textContent.toLowerCase();

        card.hidden = !cardText.includes(searchTerm);
    });
});