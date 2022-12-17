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


console.log("====== INTEGERS ======")
console.log(`4 + 2 = ${operate("4", "2", "+", false)}`)
console.log(`4 - 2 = ${operate("4", "2", "-", false)}`)
console.log(`4 * 2 = ${operate("4", "2", "*", false)}`)
console.log(`4 / 2 = ${operate("4", "2", "/", false)}`)

console.log("====== FLOATS ======")
console.log(`4.5 + 2.5 = ${operate("4.5", "2.5", "+", false)}`)
console.log(`4.5 - 2.5 = ${operate("4.5", "2.5", "-", false)}`)
console.log(`4.5 * 2.5 = ${operate("4.5", "2.5", "*", false)}`)
console.log(`4.5 / 2.5 = ${operate("4.5", "2.5", "/", false)}`)

console.log("====== PERCENTAGE ======")
console.log(`500 + 10% = ${operate("500", "10%", "+", true)}`)
console.log(`500 - 10% = ${operate("500", "10%", "-", true)}`)
console.log(`500 * 10% = ${operate("500", "10%", "*", true)}`)
console.log(`500 / 10% = ${operate("500", "10%", "/", true)}`)