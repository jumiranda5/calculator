// Vars
let display = ""
let cumulative = ""
let operationTotal = 0
let operand1 = ""
let operand2 = ""
let operator = ""
let operatorCount = 0


/* -------------------------------------
               DISPLAY
---------------------------------------- */

const displayCumulative = document.querySelector('#cumulative')
const displayTotal = document.querySelector('#total')

// Replace * and / with html entities
function setDisplayWithEntities(displayText) {
    return displayText.replace("*", "&times;").replace("/", "&divide;")
}

/* -------------------------------------
               NUMBERS
---------------------------------------- */

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
const dot = document.querySelector('#dot')

zero.addEventListener('click', () => updateOperand(0))
one.addEventListener('click', () => updateOperand(1))
two.addEventListener('click', () => updateOperand(2))
three.addEventListener('click', () => updateOperand(3))
four.addEventListener('click', () => updateOperand(4))
five.addEventListener('click', () => updateOperand(5))
six.addEventListener('click', () => updateOperand(6))
seven.addEventListener('click', () => updateOperand(7))
eight.addEventListener('click', () => updateOperand(8))
nine.addEventListener('click', () => updateOperand(9))
dot.addEventListener('click', () => updateOperand("."))

// Concatenate string to display and update operands strings
function updateOperand(n) {

    if (n === "." && display.slice(-1) === ".") return
    
    if (operatorCount === 0) {
        if (n === "." && operand1.includes(".")) return
        operand1 = operand1 + n
    }
    else {
        if (n === "." && operand2.includes(".")) return
        operand2 = operand2 + n
    }

    display = display + n
    displayTotal.innerHTML = setDisplayWithEntities(display)
}


/* -------------------------------------
               OPERATORS
---------------------------------------- */

const btnDivide = document.querySelector('#divide')
const btnMultiply = document.querySelector('#multiply')
const btnSubtract = document.querySelector('#subtract')
const btnAdd = document.querySelector('#add')
const btnEquals = document.querySelector('#equals')
const btnToggleNegative = document.querySelector('#toggle')
const btnPercentage = document.querySelector('#percentage')

btnDivide.addEventListener('click', () => updateOperator("/"))
btnMultiply.addEventListener('click', () => updateOperator("*"))
btnSubtract.addEventListener('click', () => handleNegative())
btnAdd.addEventListener('click', () => updateOperator("+"))
btnEquals.addEventListener('click', () => equals())
btnToggleNegative.addEventListener('click', () => toggleNegative())
btnPercentage.addEventListener('click', () => addPercentSymbol())

// Concatenate string or perform operation
function updateOperator(op) {

    if (display === "" || display === "-") return

    let isPercentage = false
    if (display.includes("%") || cumulative.includes("%")) isPercentage = true

    if (operatorCount === 0) {
        // concatenate operator on display
        display = display + op
        displayTotal.innerHTML = setDisplayWithEntities(display)
    }
    else if (operatorCount > 0 && operand2 === "") {
        // replace operator
        cumulative = operand1 + op
        displayCumulative.innerHTML = setDisplayWithEntities(cumulative)
    }
    else {
        // perform operation and update display
        display = ""
        operationTotal = operate(operand1, operand2, operator, isPercentage)
        operand1 = operationTotal.toString()
        operand2 = ""
        cumulative = operationTotal + op
        displayCumulative.innerHTML = setDisplayWithEntities(cumulative)
        displayTotal.textContent = ""
    }

    operator = op
    operatorCount++
}

// Handle subtract symbol => use the operator in negative number or in operation
function handleNegative() {


    // Don't repeat -
    if (display.slice(-1) === "-") return

    if (operatorCount === 0 && display === "") {
        // Negative first number
        updateOperand("-")
    }
    else if (operatorCount === 1 && operator === "+" && display.slice(-1) === "+") {
        // replace + on display
        display = display.replace("+", "")
        updateOperand("-")
    }
    else if (operatorCount > 1 && operator === "+") {
        // replace + on cumulative
        operator = "-"
        cumulative = cumulative.replace("+", "-")
        console.log(cumulative)
        displayCumulative.innerHTML = cumulative
    }
    else {
        updateOperator("-")
    }
}

// Toggle negative/positive
function toggleNegative() {
    if (operatorCount === 0) {
        // toggle operand 1
        if (display.charAt(0) === "-") display = display.slice(1)
        else display = "-" + display

        operand1 = display
        displayTotal.innerHTML = setDisplayWithEntities(display)
    }
    else {
        // toggle operator or operand2
        if (operator === "+") {
            operator = "-"
        }
        else if (operator === "-") {
            operator = "+"
        }
        else {
            if (operand2.charAt(0) === "-") operand2 = operand2.slice(1)
            else operand2 = "-" + operand2
        }

        // Update display
        if (operatorCount === 1) {   
            display = operand1 + operator + operand2
            displayTotal.innerHTML = setDisplayWithEntities(display)
        }
        else {
            cumulative = operand1 + operator
            display = operand2
            displayCumulative.innerHTML = setDisplayWithEntities(cumulative)
        }
        displayTotal.innerHTML = setDisplayWithEntities(display)
    }

}

// Handle percentage symbol
function addPercentSymbol() {
    const lastChar = display.slice(-1)
    if (lastChar === NaN || display === "") return
    updateOperand("%")
}

// Run operation, update display and vars 
function equals() {

    let isPercentage = false
    if (operand1.includes("%") || operand2.includes("%")) isPercentage = true

    if (operand2 === "") {
        operationTotal = operand1
    }
    else {
        operationTotal = operate(operand1, operand2, operator, isPercentage)
        display = operationTotal.toString()
        operand1 = operationTotal.toString()
        operand2 = ""
        operatorCount = 0
    }
    displayCumulative.textContent = ""
    displayTotal.textContent = operationTotal
}


/* -------------------------------------
              CLEAR AND DEL
---------------------------------------- */

const btnClear = document.querySelector('#clear')
const btnDel = document.querySelector('#del')

btnClear.addEventListener('click', () => clear())
btnDel.addEventListener('click', () => del())

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

// DEL => delete character by character
function del() {

    if (operatorCount > 1 && display === "") {
        // transfer text from displayCumulative to display
        displayTotal.innerHTML = displayCumulative.innerHTML
        displayCumulative.textContent = ""
        display = cumulative
        cumulative = ""
    }

    // update operator count
    const lastChar = display.slice(-1)
    if (lastChar === "+" || lastChar === "*" || lastChar === "/") {
        operatorCount--
    }
    else if (lastChar === "-") {
        const length = display.length;
        const pos = length - 2
        const lastPos = length -1
        const prevChar = display.slice(pos, lastPos)    
        if (prevChar !== "+" && prevChar !== "-" && prevChar !== "*" && prevChar !== "/") {
            operatorCount--
        }
    }

    // delete last char from display
    const newLength = display.length - 1;
    display = display.slice(0, newLength)

    // update display text
    displayTotal.innerHTML = setDisplayWithEntities(display)

    if (display === "" && cumulative === "") clear()

}


/* -------------------------------------
               CALCULATIONS
---------------------------------------- */

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

    if (total === "") return ""

    let roundedTotal = Math.round(total * 1000000) / 1000000;

    return roundedTotal

}


// Math

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
    if (b === "0") return ""
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