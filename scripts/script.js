const screen = document.querySelector("[data-screen]");
const numberButtons = document.querySelectorAll("[data-numberBtn]");
const pointButton = document.querySelector("[data-pointBtn]");
const operatorButtons = document.querySelectorAll("[data-operatorBtn]");
const equalsButton = document.querySelector("[data-equalsBtn]");
const clearButton = document.querySelector("[data-clearBtn]");
const deleteButton = document.querySelector("[data-deleteBtn]");

let firstNumber = "";
let secondNumber = "";
let currentOperation = null;
let shouldResetScreen = false;

function add(a, b) {
	return a + b;
}

function subtract(a, b){
	return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    first = Number(a);
    second = Number(b);

    switch(operator){
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "×":
            return multiply(first, second);
        case "÷":
            return second == 0 ? null : divide(first, second);
        default:
            return null;
    }
}

function appendNumber(number) {
    if (screen.textContent === "0" || shouldResetScreen) resetScreen();
    screen.textContent += number;
}

function appendPoint() {
    if (shouldResetScreen) resetScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

function deleteNumber() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) equals();
    firstNumber = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
  }

function equals() {
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === "÷" && screen.textContent === "0") {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    secondNumber = screen.textContent;
    screen.textContent = roundResult(operate(currentOperation, firstNumber, secondNumber));
    currentOperation = null;
}

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}

function clear() {
    screen.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperation = null;
}

//Event listeners
numberButtons.forEach((button) =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
);

equalsButton.addEventListener("click", equals);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);