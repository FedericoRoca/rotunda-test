const ANIMAL_SOUNDS = {
  Tiger: "grr",
  Lion: "roar",
  Duck: "quack",
  Cat: "meow",
  Cow: "moo",
  Dog: "woof",
  Monkey: "ooh ooh ah ah",
};

const formElement = document.querySelector(".zoo-form");
const animalListElement = formElement.querySelector(".zoo-form__select");
const animalPhraseElement = formElement.querySelector(".zoo-form__input");
const resultsContainer = document.querySelector(".results-container");
const resultsTitle = document.querySelector(".results-title");

// Classes
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak(phrase) {
    return phrase.split(" ").join(` ${this.sound} `) + ` ${this.sound}`;
  }
}

const AnimalClasses = {};
Object.entries(ANIMAL_SOUNDS).forEach(([animal, sound]) => {
  AnimalClasses[animal] = class extends Animal {
    constructor() {
      super(animal, sound);
    }
  };
});

// Instances
const AnimalInstances = {};
Object.entries(AnimalClasses).forEach(([animalName, AnimalClass]) => {
  AnimalInstances[animalName] = new AnimalClass();
});

//Options inside select
Object.entries(AnimalInstances).forEach((animal) => {
  const animalItem = document.createElement("option");
  animalItem.textContent = animal[0];
  animalListElement.append(animalItem);
});

//Event Listeners
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  
  resultsTitle.classList.remove("d-none");
  const selectedAnimal = animalListElement.value;
  const phraseEntered = animalPhraseElement.value;

  const animal = AnimalInstances[selectedAnimal];
  const resultText = animal.speak(phraseEntered);

  const resultElement = document.createElement("div");
  resultElement.classList.add(
    "d-flex",
    "align-items-center",
    "p-3",
    "mb-3",
    "border",
    "rounded",
    "bg-white",
    "shadow-sm"
  );

  const animalImage = document.createElement("img");
  animalImage.src = `images/${selectedAnimal}.jpg`;
  animalImage.alt = `${selectedAnimal} image`;
  animalImage.classList.add("img-fluid", "me-3", "rounded");

  const resultTextContainer = document.createElement("div");
  resultTextContainer.innerHTML = `<strong>${selectedAnimal}:</strong> <span class="fst-italic">"${resultText}"</span>`;

  resultElement.appendChild(animalImage);
  resultElement.appendChild(resultTextContainer);
  resultsContainer.appendChild(resultElement);

  formElement.reset();
});
