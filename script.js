/*
    TODO:
        - Alow negative number
        - DEL
        - Percentage
        - Floats
        - Toggle +/-
*/


// Vars
let display = ""
let operationTotal = 0
let operand1 = ""
let operand2 = ""
let operator = ""
let operatorCount = 0


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
const btnDivide = document.querySelector('#divide')
const btnMultiply = document.querySelector('#multiply')
const btnSubtract = document.querySelector('#subtract')
const btnAdd = document.querySelector('#add')
const btnEquals = document.querySelector('#equals')
const btnClear = document.querySelector('#clear')

zero.addEventListener('click', () => updateOperand(0));
one.addEventListener('click', () => updateOperand(1));
two.addEventListener('click', () => updateOperand(2));
three.addEventListener('click', () => updateOperand(3));
four.addEventListener('click', () => updateOperand(4));
five.addEventListener('click', () => updateOperand(5));
six.addEventListener('click', () => updateOperand(6));
seven.addEventListener('click', () => updateOperand(7));
eight.addEventListener('click', () => updateOperand(8));
nine.addEventListener('click', () => updateOperand(9));
btnDivide.addEventListener('click', () => updateOperator("/"))
btnMultiply.addEventListener('click', () => updateOperator("*"))
btnSubtract.addEventListener('click', () => updateOperator("-"))
btnAdd.addEventListener('click', () => updateOperator("+"))
btnEquals.addEventListener('click', () => equals())
btnClear.addEventListener('click', () => clear())


// Operands => Concatenate string to display and update operands strings
function updateOperand(n) {
    display = display + n
    
    if (operatorCount === 0) {
        operand1 = display
    }
    else if (operatorCount === 1) {
        operand2 = operand2 + n
    }
    else {
        operand2 = display
    }

    displayTotal.innerHTML = display
}

// Operator => concatenate string or perform operation
function updateOperator(op) {

    let opEntity = op
    if (op === "/") opEntity = "&divide;"
    else if (op === "*") opEntity = "&times;"

    if (operatorCount === 0) {
        // concatenate operator on display
        display = display + opEntity
        displayTotal.innerHTML = display
    }
    else if (operatorCount > 0 && operand2 === "") {
        // replace operator
        displayCumulative.innerHTML = operand1 + opEntity
    }
    else {
        // perform operation and update display
        display = ""
        operationTotal = operate(operand1, operand2, operator, false)
        operand1 = operationTotal.toString()
        operand2 = ""
        displayCumulative.innerHTML = operationTotal + opEntity
        displayTotal.textContent = ""
    }

    operator = op
    operatorCount++
}


// Equals => run operation, update display and vars 
function equals() {
    if (operand2 === "") {
        operationTotal = operand1
    }
    else {
        operationTotal = operate(operand1, operand2, operator, false)
        display = operationTotal.toString()
        operand1 = operationTotal.toString()
        operand2 = ""
        operatorCount = 0
    }
    displayCumulative.textContent = ""
    displayTotal.textContent = operationTotal
}


// Clear => reset display and vars values
function clear() {
    displayCumulative.textContent = ""
    displayTotal.textContent = ""
    display = ""
    operationTotal = 0
    operand1 = ""
    operand2 = ""
    operator = ""
    operatorCount = 0
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