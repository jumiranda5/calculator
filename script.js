// Vars
let display = ""
let cumulative = ""
let total = 0

// Elements
const displayCumulative = document.querySelector('#cumulative')
const displayTotal = document.querySelector('#total')
const zero = document.querySelector('#zero')
const one = document.querySelector('#one')
const two = document.querySelector('#two')
const three = document.querySelector('#three')
const four = document.querySelector('#four')
const five = document.querySelector('#five')
const six = document.querySelector('#six')
const seven = document.querySelector('#seven')
const eight = document.querySelector('#eight')
const nine = document.querySelector('#nine')

zero.addEventListener('click', () => updateDisplay(0));
one.addEventListener('click', () => updateDisplay(1));
two.addEventListener('click', () => updateDisplay(2));
three.addEventListener('click', () => updateDisplay(3));
four.addEventListener('click', () => updateDisplay(4));
five.addEventListener('click', () => updateDisplay(5));
six.addEventListener('click', () => updateDisplay(6));
seven.addEventListener('click', () => updateDisplay(7));
eight.addEventListener('click', () => updateDisplay(8));
nine.addEventListener('click', () => updateDisplay(9));


// Update display
function updateDisplay(n) {
    display = display + n
    displayTotal.textContent = display
}


// Function to perform operations
function operate(a, b, operator, isPercentage) {

    let total = 0

    if (isPercentage) {
        total = percent(a, b, operator)
    }
    else {
        switch(operator) {
            case "+":
                total = sum(a, b)
                break
            case "-":
                total = subtract(a, b)
                break
            case "*":
                total = multiply(a, b)
                break
            case "/":
                total = divide(a, b)
                break
        }
    }

    return total

}


// Calculator operations:

const sum = (a, b) => {
    return getNumber(a) + getNumber(b)
}

const subtract = (a, b) => {
    return getNumber(a) - getNumber(b)
}

const multiply = (a, b) => {
    return getNumber(a) * getNumber(b)    
}

const divide = (a, b) => {
    return getNumber(a) / getNumber(b)
}

const percent = (a, b, operator) => {
    a = getPercent(a).toString()
    b = getPercent(b).toString()
    c = multiply(a, b).toString()
    let total = 0

    switch (operator) {
        case "+":
            total = sum(a, c)
            break
        case "-":
            total = subtract(a, c)
            break
        case "*":
            total = multiply(a, b)
            break
        case "/":
            total = divide(a, b)
            break
    }

    return total
}


// Convert string from input to number:

const getNumber = (x) => {
    if (x.includes(".")) {
        return parseFloat(x)
    }
    else {
        return parseInt(x)
    }
}

const getPercent = (x) => {
    if (x.includes("%")) {
        const number = x.replace("%", "")
        return getNumber(number) / 100
    }
    else {
        return getNumber(x)
    }
}