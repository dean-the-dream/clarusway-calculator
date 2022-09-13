const screen = document.querySelector(".screen p"); //
let display = "0";
let equation = [];
const numberpad = document.querySelector(".numpad");
const clearButton = document.querySelector(".clear");
let formattedNumber = ["0"];
let operationIsPressed = false;
function enterNumber (e) {

    if(e.target.className.includes("number")){
        const digit = e.target.innerText;
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

function resetOperation() {
    let bttns = document.querySelectorAll(".orange");
    for(i of bttns)
    i.style = `background-color: #FE9F06; color: white;`
    operationIsPressed = false;
}

function engageOperation(x) {
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
    }
}

function enterOperation (e) {
    if(e.target.className.includes("operation")){
        engageOperation(e.target)
        // operationIsPressed = true;
        // e.target.style = `background-color: white; color: #FE9F06 `
        isNaN(parseFloat(formattedNumber.join(""))) ?  null : equation.push(parseFloat(formattedNumber.join("")));
        equation.push(e.target.innerText)
        formattedNumber = [];

        if(e.target.innerText == "=") {
            let result = 0
            if(equation.length == 2){
                result = equation[0]
                screen.innerText = result
                equation = [equation[0]];
                formattedNumber = [];
            } else if (equation.length == 4){
                result = twoNum(equation)
                screen.innerText = result;
                equation = [result];
                formattedNumber = [];
            }
        }
        console.log(equation)
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

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
