const screen = document.querySelector(".screen p"); //the section of the calculator containing the text
let equation = [];  // to hold the entire quation until a calculation is performed
const numberpad = document.querySelector(".numpad"); // the section that holds all of the keys
const clearButton = document.querySelector(".clear");
let formattedNumber = ["0"]; //to hold the number the user entered until an operation is entered
let operationIsPressed = false; // to track when an operation is entered
function enterNumber (e) { //tells js what to do when numbers are entered, based on the state of the calculator

    if(e.target.className.includes("number")){ // only run this function if a number or a decimal is entered
        const digit = e.target.innerText; // digit represents the number the user entered
        if (operationIsPressed) {
            screen.innerText = "";
            // operationIsPressed = false;
            resetOperation();
        }
        if(formattedNumber.length < 10){
            if(screen.innerText === "0"){
                if (digit === "0"){

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
        operationIsPressed = true; 
    }
    
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
        engageOperation(e.target)
        if(formattedNumber.length > 1)

        if(isNaN((equation[0]))){ // if the first array item is not a number
            equation.shift(); // remove the first item 
        } 
        
        equation.push(formattedNumber);
        equation.push(e.target.innnerText);
        // else if((e.target.innerText === "=") && equation.length > 1){ //if user pressed equal and there is more than one character
        //     equation.push(e.target.innerText) // add equal to the equation array
        //     calculate(equation); 
        // } else if((equation.length > 2)){ // if if the equation has more than one item
        //     if ((isNaN(equation[equation.length - 1]) && isNaN(equation[equation.length - 2]))) { //if the last two items are symbols
        //         equation.splice(equation.length - 2,1) // remove the second to last item
        //     } else if((equation[1] === "X") ||( equation[1] === "/")){ // if the second item is multiply or divide
        //         calculate(equation);
        //     } 
        // } else if ( equation.lenghth > 3){
        //     if((equation[equation.length - 1] === "+") || (equation[equation.length - 1] === "-")){ //if the last operation is a plus or a minus
        //         calculate(equation);
        //     } else if (equation.length > 4) {
        //     calculate(equation)
        //     }
        // } 
        
        console.log(equation)
    }
}


function calculate (x){
    if(x.length > 2){
        const result = twoNum(x)
        screen.innerText = result;
        equation = [result];
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

function threeNum (x) {
    if(x.includes("X") || x.includes("/")){
        if(x.indexOf("X") < x.indexOf("/")) {

        }

    }
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
