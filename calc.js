const screen = document.querySelector(".screen p"); //the section of the calculator containing the text
let equation = [];  // to hold the entire quation until a calculation is performed
const numberpad = document.querySelector(".numpad"); // the section that holds all of the keys
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector (".equal")
let formattedNumber = ["0"]; //to hold the number the user entered until an operation is entered
let operationIsPressed = false; // to track when an operation is entered
function enterNumber (e) { //tells js what to do when numbers are entered, based on the state of the calculator

    if(e.target.className.includes("number")){ // only run this function if a number or a decimal is entered
        const digit = e.target.innerText; // digit represents the number the user entered
        if (operationIsPressed) {
            screen.innerText = "";
            resetOperation();
        }
        if(formattedNumber.length < 10){ //if the formatted number has less than 10 digits
            if(screen.innerText === "0"){ // if is is equal to 0
                if (digit === "0"){
                    formattedNumber =[];
                } else if (digit === ".") {
                    formattedNumber.push(digit)
                    screen.innerText += digit;
                } else {
                    formattedNumber.push(digit)
                    screen.innerText = digit;
                }
            } else if(screen.innerText.includes(".")){
                if(digit !== ".") {
                    formattedNumber.push(digit);
                    screen.innerText += digit;
                }
            } else if((formattedNumber.length >= 3)){
                formattedNumber.push(digit);
                let displayNum = formattedNumber.join("");
                let displayNum1 = Number(displayNum);
                screen.innerText = displayNum1.toLocaleString("en-US");

            } else {
                screen.innerText += digit;
                formattedNumber.push(digit)
            }


            // equation.push(formattedNumber.join(""));

            console.log(formattedNumber)
            clearButton.innerText = "C";
        }

    }
}

function resetOperation() { //change the state of the calcultor once the operation is no longer being used
    let bttns = document.querySelectorAll(".orange");
    for(i of bttns)
    i.style = `background-color: #FE9F06; color: white;`
    operationIsPressed = false;
}

function engageOperation(x) { //change the state of the calculator when the user presses an operation
    resetOperation();
    if(!(x.className.includes("equal"))){
        x.style = `background-color: white; color: #FE9F06`
    }
    operationIsPressed = true; 
}

function pressClear (x) {
    if(x.target.className.includes("clear")){
        if(clearButton.innerText == "C") {
            screen.innerText = "0"
            formattedNumber = [];
            clearButton.innerHTML = "AC"
        } else {
            screen.innerText = "0"
            formattedNumber = [];
            equation = [];
        }
        resetOperation();
    }
}

function enterOperation (e) { //adds operation to equation. determines if quation is ready to be calculated
    if(e.target.className.includes("operation")){ 
        engageOperation(e.target);
        (formattedNumber[0] === "0") ? formattedNumber.shift() : null;
        if(formattedNumber.length > 0){
            equation.push(parseFloat(formattedNumber.join("")));
            formattedNumber = [];
        }
        equation.push(e.target.innerText);

        if(isNaN((parseFloat(equation[0])))){ // if the first array item is not a number
            equation.shift(); // remove the first item 
        } else if ((!isNaN(equation[0])) && (!isNaN(equation[1]))) {
            equation.shift();
        } else if ((e.target.innerText === "=")){ //if user pressed equal 
            calculate(equation); 
        } else if ((isNaN(equation[equation.length - 1]) && isNaN(equation[equation.length - 2]))) { //if the last two items are symbols
                equation.splice(equation.length - 2,1) // remove the second to last item
        } else if((equation[1] === "X") ||( equation[1] === "/")){ // if the second item is multiply or divide
                calculate(equation);
        } 
        // } else if ( equation.lenghth > 3){
        //     if((equation[equation.length - 1] === "+") || (equation[equation.length - 1] === "-")){ //if the last operation is a plus or a minus
        //         calculate(equation);
        //     } else if (equation.length > 4) {
        //     calculate(equation)
        //     }
        // } 
        // console.log({formattedNumber})
         console.log({equation})
    }
}


function calculate (x){
    console.log({x} + " - calculate")
    let result = 0;
    if(x.length == 2) {
        result = x[0];
        screen.innerText = result;
        equation =  [result];
        formattedNumber = [];
    } else if (x.length == 3){
        if ((isNaN(x[2]))){
            result = plusEqual(x);
            screen.innerText = result;
            equation =  [result];
            formattedNumber = [];
        }
    } else if (x.length == 4){
        result = twoNum(x);
        screen.innerText = result;
        equation =  [result];
        formattedNumber = [];
    }
}

function twoNum (x) {
    switch (x[1]) {
        case "+":
           return x[0] + x[2]
        case "-":
           return x[0] - x[2]
        case "X":
           return x[0] * x[2]
        case "/":
           return x[0] / x[2]
    }

}

function plusEqual (x) {
    switch (x[1]) {
        case "+":
           return x[0] += x[0]
        case "-":
           return x[0] -= x[0]
        case "X":
           return x[0] *= x[0]
        case "/":
           return x[0] /= x[0]
    }
}

function threeNum (x) {
    if(x.includes("X") || x.includes("/")){
        if(x.indexOf("X") < x.indexOf("/")) {

        }

    }
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
