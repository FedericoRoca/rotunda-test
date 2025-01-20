// DOM Elements
const formElement = document.querySelector(".parser-form");
const inputElement = formElement.querySelector(".parser-form__input");
const inputFormatElement = formElement.querySelector(
  ".parser-form__input-format"
);
const resultsElement = document.querySelector(".results__content");
const resultsTitle = document.querySelector(".results__title");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const container = document.querySelector(".results__content");


// Event Listeners
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  parseURL();
});

// Functions
function parseURL() {
  const format = inputFormatElement.value.trim();
  const url = inputElement.value.trim();
  alertPlaceholder.innerHTML = "";
  container.innerHTML = "";

  if (!format || !url) {
    resultsTitle.classList.add("d-none");
    appendAlert("Please enter both the URL format and the URL to parse");
    return;
  }

  const urlObject = extractVariableValues(format, url);

  renderResults(urlObject);
  formElement.reset()
}

// Function to extract variable values from the URL
function extractVariableValues(format, url) {
  const [urlPath, queryParams] = url.split("?");
  const formatParts = format.split("/");
  const urlParts = urlPath.split("/");

  const values = {};
  formatParts.forEach((part, index) => {
    if (part.startsWith(":")) {
      const key = part.slice(1);
      values[key] = decodeURIComponent(urlParts[index] || "");
    }
  });

  if (queryParams) {
    queryParams.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      values[key] = decodeURIComponent(value || "");
    });
  }

  return values;
}

// Function to render results
function renderResults(results) {
  const container = document.querySelector(".results__content");
  container.innerHTML = "";

  if (Object.keys(results).length === 0) {
    resultsTitle.classList.add("d-none");
    appendAlert(
      "Please check the format and URL so we can perform correct parsing."
    );
    return;
  }

  resultsTitle.classList.remove("d-none");
  const resultsHTML = `
    <div class="bg-light p-3 rounded border">
      <p class="text-primary">{</p>
      ${Object.entries(results)
        .map(
          ([key, value]) =>
            `<p class="mb-1 text-secondary">  ${key}: ${value},</p>`
        )
        .join("")}
      <p class="text-primary">}</p>
    </div>
  `;

  container.innerHTML = resultsHTML;
}



// Function to create alert messege
function appendAlert(message) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-warning alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
}
