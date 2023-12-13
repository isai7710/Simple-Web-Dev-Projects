const unitTypeSelected = document.getElementById('unit-type');
const unitOptionsToSelectTop = document.getElementById('unit-input-options');
const unitOptionsToSelectBottom = document.getElementById('unit-output-options');

const unitsByType = {
    length: ['cm', 'm', 'km', 'in', 'ft', 'mi'],
    speed: ['m/s', 'km/h', 'mph', 'kph'],
    temperature: ['°C', '°F', 'K'],
    pressure: ['Pa', 'atm', 'bar']
};

// populate drop down information (units) for the appropriate select element
function populateDropdown(selectElement, units) {
    // create option element for each unit in units array ([cm, m, km])
    // return an array of option elements into the const 'options' variable
    const options = units.map(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        return option;
    });
    selectElement.innerHTML = '';
    options.forEach(option => selectElement.appendChild(option));
}

function populateUnits() {
    const units = unitsByType[unitTypeSelected.value];
    populateDropdown(unitOptionsToSelectTop, units);
    populateDropdown(unitOptionsToSelectBottom, units);
}

function convertUnits(){
    const inputValue = document.getElementById('input-amount').value;
    const outputElement = document.getElementById('output-amount');

    outputElement.value = inputValue;

}

function appendErrorParagraph(errorMessage){
    const paragraph = document.createElement('p');
    // can also write paragraph.textContent = 'Error: ' + errorMessage;
    paragraph.textContent = `Error: ${errorMessage}`;
    document.body.appendChild(paragraph);
}


unitTypeSelected.addEventListener('change', populateUnits);

populateUnits(); // Populate initially