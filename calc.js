const screen = document.querySelector(".screen p .entry"); //the section of the calculator containing the text
let equation = [];  // to hold the entire quation until a calculation is performed
const numberpad = document.querySelector(".numpad"); // the section that holds all of the keys
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector (".equal")
let formattedNumber = ["0"]; //to hold the number the user entered until an operation is entered
let operationIsPressed = false; // to track when an operation is entered
let isNeg = false;
const minusButton = document.querySelector(".negative")
const minusSign = document.querySelector(".minus")
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
        } 
        clearButton.innerText = "C";   
    }
}

function resetOperation() { //change all the operations back to the normal color
    let bttns = document.querySelectorAll(".orange");
    for(i of bttns){
        // i.style = `background-color: #FE9F06; color: white;`
        i.style = null;
        // i.style.backgroundColor = "#FE9F06;";
        // i.style.color = "white;"
    }
    
    operationIsPressed = false;
}

function engageOperation(x) { //change the color of an operation when the user presses it
     resetOperation();
    if(!(x.className.includes("equal"))){
        x.style = `background-color: white; color: #FE9F06`
        // i.style.backgroundColor = "white;";
        // i.style.color = "#FE9F06;"
        
    }
    operationIsPressed = true; 
}

function posNeg(){ //determine if the negative symbol is selected or not
    if(isNeg){ //if negative is engaged
        isNeg = false; //change it to positive
        minusSign.innerText = ""; //clear the minus sign from the screen
    } else { //if negative is not alread engaged
        isNeg = true; // change it to negative
        (equation[0] < 0) ? minusSign.innerText = "" : minusSign.innerText = "-"; //if the displayed number is already negative, don't display the negative sign, otherwise display it
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
        if(isNeg){
            posNeg()
        }
        resetOperation();
    }
}

function enterOperation (e) { //adds select operation to equation. determines if quation is ready to be calculated
    if(e.target.className.includes("operation")){ 
        engageOperation(e.target);
        ((formattedNumber[0] === "0") && (formattedNumber.length > 1)) ? formattedNumber.shift() : null; //to remove the initial zero from the html file
        if(formattedNumber.length > 0){ // if a number was pressed 
            if(isNeg){ // if negative was pressed
                equation.push((parseFloat(formattedNumber.join("")))*-1); //change the number to negative number, add it to the equation
                posNeg();
            } else{
                equation.push(parseFloat(formattedNumber.join(""))); //add the number to the quation
            }
            formattedNumber = []; //clear the queue for the next entry
        }
        equation.push(e.target.innerText); // add the operation to the equation

        if(isNaN((parseFloat(equation[0])))){ // if the first array item is not a number
            equation.shift(); // remove the first item 
        } else if ((!isNaN(equation[0])) && (!isNaN(equation[1]))) { // if the equation has 2 consecutive numbers
            equation.shift(); //remove the first number
        } else if ((e.target.innerText === "=")){ //if user presses equal 
            if(equation[equation.length - 2] === "="){ //if there are 2 consective equals sign
                equation.pop(); //remove on equal signs
                calculate(equation) //calculate the euquation
            } else { //if there is only one equal
                calculate(equation) // calculate the equation
            }
        } else if ((isNaN(equation[equation.length - 1]) && isNaN(equation[equation.length - 2]))) { //if the last two items are symbols
                equation.splice(equation.length - 2,1) // remove the second to last item
        } else if(((equation[1] === "X") ||( equation[1] === "÷")) && equation.length > 3){ // if the second item is multiply or divide
                calculate(equation);
        } else if((e.target.innerText === "+" ||(e.target.innerText === "-")) && equation.length > 3){
                calculate(equation);
        } else if((equation.length > 3) && (!isNaN(equation[equation.length-1])))
        {
                calculate(equation)
        }
    }
}


function calculate (x){ //calculates the equation sent from enterOperation
    let result = 0; 
    (x[x.length-1] === "=") ? x.pop() : null; 
    if(x.length == 1) {
        result = x[0];
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if(x.length == 2) {
        result = plusEqual(x);
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if (x.length == 3) {
        result = twoNum(x);
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if (x.length == 4){
        result = [twoNum(x), x[3]];
        console.log(result)
        screen.innerText = result[0].toLocaleString();
        equation =  [...result];
        formattedNumber = []; 
    }  else {
        result = threeNum(x);
        console.log(result)
        screen.innerText = result.toLocaleString();
        formattedNumber = []; 
    }
}

function twoNum (x) { // to perform an operation on an equation with 2 numbers (x + x)
    switch (x[1]) {
        case "+":
           return x[0] + x[2]
        case "-":
           return x[0] - x[2]
        case "X":
           return x[0] * x[2]
        case "÷":
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
        case "÷":
           return x[0] /= x[0]
    }
}

function threeNum (y) { //to perform operations on an equation with 3 numbers
    let reduce = y.slice(2,5)
    return twoNum([...y.slice(0,2), twoNum(reduce)])
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
minusButton.addEventListener("click", posNeg)
