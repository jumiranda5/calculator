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
        const parts = x.split(" ")
        return getNumber(parts[0]) / 100
    }
    else {
        return getNumber(x)
    }
}


console.log("====== INTEGERS ======")
console.log(`4 + 2 = ${sum("4", "2")}`)
console.log(`4 - 2 = ${subtract("4", "2")}`)
console.log(`4 * 2 = ${multiply("4", "2")}`)
console.log(`4 / 2 = ${divide("4", "2")}`)

console.log("====== FLOATS ======")
console.log(`4.5 + 2.5 = ${sum("4.5", "2.5")}`)
console.log(`4.5 - 2.5 = ${subtract("4.5", "2.5")}`)
console.log(`4.5 * 2.5 = ${multiply("4.5", "2.5")}`)
console.log(`4.5 / 2.5 = ${divide("4.5", "2.5")}`)

console.log("====== INTEGERS ======")
console.log(`4 + 2 = ${sum("4", "2")}`)
console.log(`4 - 2 = ${subtract("4", "2")}`)
console.log(`4 * 2 = ${multiply("4", "2")}`)
console.log(`4 / 2 = ${divide("4", "2")}`)

console.log("====== PERCENTAGE ======")
console.log(`500 + 10% = ${percent("500", "10%", "+")}`)
console.log(`500 - 10% = ${percent("500", "10%", "-")}`)
console.log(`500 * 10% = ${percent("500", "10%", "*")}`)
console.log(`500 / 10% = ${percent("500", "10%", "/")}`)