const unitTypeSelected = document.getElementById('unit-type');
const unitOptionsToSelectTop = document.getElementById('unit-input-options');
const unitOptionsToSelectBottom = document.getElementById('unit-output-options');

const unitsByType = {
    length: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'mi'],
    speed: ['m/s', 'km/h', 'mph', 'kph'],
    temperature: ['°C', '°F', 'K'],
    pressure: ['Pa', 'atm', 'bar']
};

const conversionFactors = {
    // TODO: Conversion factors for imperial units (in, ft, mi) and other units (temperature, pressure, etc.)
    length: {
        mm_to_cm: 0.1,      // 1 mm = 0.1 cm
        mm_to_m: 0.001,     // 1 mm = 0.001 m
        mm_to_km: 0.000001, // 1 mm = 0.000001 km (or 0.001 * 0.001 for clarification)
        cm_to_mm: 10,       // 1 cm = 10 mm
        cm_to_m: 0.01,      // 1 cm = 0.01 m
        cm_to_km: 0.00001,  // 1 cm = 0.00001 km (or 0.01 * 0.001 for clarification)
        m_to_mm: 1000,      // 1 m = 1000 mm
        m_to_cm: 100,       // 1 m = 100 cm
        m_to_km: 0.001,     // 1 m = 0.001 km
        km_to_mm: 1000000,  // 1 km = 1000000 mm (or 1000 * 1000 for clarification)
        km_to_cm: 100000,   // 1 km = 100000 cm (or 100 * 1000 for clarification)
        km_to_m: 1000       // 1 km = 1000 m
    }
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
    const unitSelected = unitTypeSelected.value;
    const inputValue = parseFloat(document.getElementById('input-amount').value);;
    let outputValue = 0;

    if (inputValue == null || isNaN(inputValue)){
        appendErrorParagraph('no valid amount inputted, please input amount and try again');
    }

    switch (unitSelected){
        case 'length':
            outputValue = convertLength(inputValue, unitOptionsToSelectTop.value, unitOptionsToSelectBottom.value);
    }

    const outputElement = document.getElementById('output-amount');
    outputElement.value = outputValue;

}

function convertLength(value, inputUnits, outputUnits){
    if (conversionFactors.length[inputUnits + '_to_' + outputUnits]) {
        return value * conversionFactors.length[inputUnits + '_to_' + outputUnits];
    } else if (inputUnits == outputUnits) {
        return value;
    }
}

function appendErrorParagraph(errorMessage){
    const paragraph = document.createElement('p');
    // can also write paragraph.textContent = 'Error: ' + errorMessage;
    paragraph.textContent = `Error: ${errorMessage}`;
    document.body.appendChild(paragraph);
}


unitTypeSelected.addEventListener('change', populateUnits);

populateUnits(); // Populate initially