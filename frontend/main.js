import { gemHilsen, hentHilsner } from "./backend.js";

const buttonSection = document.querySelector('main');
const colorSelector = document.querySelector('#selected-color');
const pickColorButton = document.querySelector("#pick-color-button")
const formular = document.querySelector("#hilsen-formular")
const dialog = document.querySelector("dialog");

window.hilsner = [];

function skiftRød() {
    console.log("skifter farve til rød")
    buttonSection.style.backgroundColor = 'red';
}

function skiftPink() {
    buttonSection.style.backgroundColor = 'hotpink';
}

function skiftGrøn() {
    buttonSection.style.backgroundColor = 'green';
}

function skiftTilValgtFarve() {
    const newColor = colorSelector.value;
    buttonSection.style.backgroundColor = newColor; 
}



document.querySelector('.rød').addEventListener('click', skiftRød);
document.querySelector('.pink').addEventListener('click', skiftPink);
document.querySelector('.grøn').addEventListener('click', skiftGrøn);
document.querySelector('#pick-color-button').addEventListener('click', skiftTilValgtFarve);

colorSelector.addEventListener('change', (_value) => {
    const newColor = colorSelector.value;
    pickColorButton.style.backgroundColor = `${newColor}aa`;
});

formular.addEventListener('submit', (event) => {
    event.preventDefault();
    const navn = event.target.elements.name.value;
    const hilsen = event.target.elements.message.value;

    gemHilsen(navn, hilsen);
});

dialog.addEventListener("beforetoggle", () => {
    formular.reset();
});

window.updateHilsner = (newHilsner) => {
    console.log("updater hilsner")
    window.hilsner = newHilsner;
    const list = document.querySelector("#hilsner-list");
    list.innerHTML = "";
    window.hilsner.forEach(hilsen => {
        const item = document.createElement("li");
        window.addHilsen(hilsen);
    });
};

window.addHilsen = (hilsen) => {
    console.log("tilføjer hilsen")
    window.hilsner.push(hilsen);
    const list = document.querySelector("#hilsner-list");
    const item = document.createElement("li");
    const name = document.createElement("h2");
    const message = document.createElement("p");
    name.textContent = hilsen.name;
    message.textContent = hilsen.message;
    item.appendChild(name);
    item.appendChild(message);
    item.id = `hilsen-${hilsen.id}`;
    list.appendChild(item);
};

window.removeHilsen = (id) => {
    console.log("fjerner hilsen")
    window.hilsner = window.hilsner.filter(hilsen => hilsen.id !== id);
    const item = document.querySelector(`#hilsen-${id}`);
    if(item) {
        item.remove();
    }
}

hentHilsner();

