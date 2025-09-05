import { gemHilsen } from "./api.js";

const buttonSection = document.querySelector('main');
const colorSelector = document.querySelector('#selected-color');
const pickColorButton = document.querySelector("#pick-color-button")
const formular = document.querySelector("#hilsen-formular")
const dialog = document.querySelector("dialog");

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