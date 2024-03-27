const unitTypeSelected = document.getElementById('unit-type');
const unitOptionsToSelectTop = document.getElementById('unit-input-options');
const unitOptionsToSelectBottom = document.getElementById('unit-output-options');

const unitsByType = {
    length: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yds', 'mi'],
    speed: ['m/s', 'km/h', 'mph', 'ft/s', 'mi/min', 'km/min'],
    temperature: ['°C', '°F', 'K'],
    pressure: ['Pa', 'atm', 'bar', 'lbf/in^2']
};

const conversionFactors = {
    // TODO: Conversion factors for other units (temperature, pressure, etc.)
    /* 
        after choosing a base unit, we can convert any value 'v' by multiplying it by the 
        source unit factor divided by the destination unit factor (Cs/Cd)
        for example, to convert 8 yards to feet we do:
          8 yards * (Cs / Cd)
        = 8 yards * ((0.9144 meters/yard) / (0.3048 meters/feet))
        = 8 yards * (0.9144 / 0.3048) feet/yard
        = 24 feet
    */
    length: {
        'mm': 0.001,      // 0.001 m/mm
        'cm': 0.01,       // 0.01 m/cm
        'm': 1.0,         // base unit
        'km': 1000,       // 1000 m/km
        'in': 0.0254,     // 0.0254 m/km
        'ft': 0.3048,     // 0.3048 m/ft
        'yds': 0.9144,    // 0.9144 m/yds
        'mi': 1609.34     // 1609.34 m/mi
    },
    speed: {
        'm/s': 1.0,         // base unit 
        'km/h': 0.2778,     // 0.2778 (m/s)/(km/h)
        'mph': 0.44704,     // 0.44704 (m/s)/(mph)
        'ft/s': 0.3048,     // 0.3048 (m/s)/(ft/s)
        'mi/min': 0.03728,  // 0.03728 (m/s)/(mi/min)
        'km/min': 0.06,     // 0.06 (m/s)/(km/min)
    },
    pressure: {
        'Pa': 1.0,              // base unit
        'atm': 101325,          // 101325 Pa/atm
        'bar': 100000,          // 100000 Pa/bar
        'lbf/in^2': 6894.76     // 6894.76 Pa/(lbf/in^2)
    },
    temperature: {
        '°C': {
            '°F': (value) => value * (9 / 5) + 32,
            'K': (value) => value + 273.15
          },
          '°F': {
            '°C': (value) => (value - 32) * (5 / 9),
            'K': (value) => (value - 32) * (5 / 9) + 273.15
          },
          'K': {
            '°C': (value) => value - 273.15,
            '°F': (value) => (value - 273.15) * (9 / 5) + 32
          }
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
            break;
        case 'speed':
            outputValue = convertSpeed(inputValue, unitOptionsToSelectTop.value, unitOptionsToSelectBottom.value);
            break;
        case 'pressure':
            outputValue = convertPressure(inputValue, unitOptionsToSelectTop.value, unitOptionsToSelectBottom.value);
            break;
        case 'temperature':
            outputValue = convertTemp(inputValue, unitOptionsToSelectTop.value, unitOptionsToSelectBottom.value);
        default:
            console.log("Error");
    }

    const outputElement = document.getElementById('output-amount');
    outputElement.value = outputValue;
}

function convertLength(value, inputUnits, outputUnits) {
    return value * (conversionFactors.length[inputUnits] / conversionFactors.length[outputUnits]);
}

function convertSpeed(value, inputUnits, outputUnits) {
    return value * (conversionFactors.speed[inputUnits] / conversionFactors.speed[outputUnits]);
}

function convertPressure(value, inputUnits, outputUnits) {
    return value * (conversionFactors.pressure[inputUnits] / conversionFactors.pressure[outputUnits]);
}

function convertTemp(value, inputUnits, outputUnits) {
    if (inputUnits == outputUnits){
        return value;
    }
    if (conversionFactors.temperature[inputUnits] && conversionFactors.temperature[outputUnits]){
        return conversionFactors.temperature[inputUnits][outputUnits](value);
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