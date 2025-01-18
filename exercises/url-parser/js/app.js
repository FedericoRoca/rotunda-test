// DOM Elements
const formElement = document.querySelector(".parser-form");
const inputElement = formElement.querySelector(".parser-form__input");
const inputFormatElement = formElement.querySelector(
  ".parser-form__input-format"
);
const resultsElement = document.querySelector(".results__content");

// Event Listeners
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  parseURL();
});

// Functions
function parseURL() {
  const format = inputFormatElement.value.trim();
  const url = inputElement.value.trim();

  if (!format || !url) {
    alert("Please enter both the URL format and the URL to parse.");
    return;
  }

  const urlObject = extractVariableValues(format, url);

  inputElement.value = "";
  inputFormatElement.value = "";

  renderResults(urlObject);
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

  for (const [key, value] of Object.entries(results)) {
    const resultItem = document.createElement("p");
    resultItem.textContent = `${key}: ${value}`;
    container.appendChild(resultItem);
  }
}
