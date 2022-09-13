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
        } 
        clearButton.innerText = "C";

        // if(((equation[1] === "X") ||( equation[1] === "/")) && (equation.length == 2)){ // if the second item is multiply or divide
        //     if(formattedNumber.length > 0){
        //         equation.push(parseFloat(formattedNumber.join("")));
        //         formattedNumber = [];
        //     }
        //     calculate(equation);
        // }
    
            
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
            if(equation[equation.length - 2] === "="){
                equation.pop();
                calculate(equation)
            } else {
                calculate(equation)
            }
        } else if ((isNaN(equation[equation.length - 1]) && isNaN(equation[equation.length - 2]))) { //if the last two items are symbols
                equation.splice(equation.length - 2,1) // remove the second to last item
        } else if(((equation[1] === "X") ||( equation[1] === "/")) && equation.length > 3){ // if the second item is multiply or divide
                calculate(equation);
        } else if((e.target.innerText === "+" ||(e.target.innerText === "-")) && equation.length > 3){
                calculate(equation);
        } else if((equation.length > 3) && (!isNaN(equation[equation.length-1])))
        {
                calculate(equation)
        }
    }
}


function calculate (x){
    console.log({...x})
    let result = 0; 
    (x[x.length-1] === "=") ? x.pop() : null; 
    console.log({...x})
    if(x.length == 1) {
        console.log("length is 1")
        result = x[0];
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if(x.length == 2) {
        console.log("length is 2")
        result = plusEqual(x);
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if (x.length == 3) {
        console.log("length is 3")
        result = twoNum(x);
        screen.innerText = result.toLocaleString();
        equation =  [result];
        formattedNumber = [];
    } else if (x.length == 4){
        console.log("length is 4 with operation")
        result = [twoNum(x), x[3]];
        console.log(result)
        screen.innerText = result[0].toLocaleString();
        equation =  [...result];
        formattedNumber = []; 
    }  else {
        console.log("length is 5 with")
        result = threeNum(x);
        console.log(result)
        screen.innerText = result.toLocaleString();
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

function threeNum (y) {
    let reduce = y.slice(2,5)
    console.log("this is reduce")
    console.log(reduce)
    return twoNum([...y.slice(0,2), twoNum(reduce)])
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
