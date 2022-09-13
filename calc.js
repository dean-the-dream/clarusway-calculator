const screen = document.querySelector(".screen p");
let display = "0";
const equation = [];
const numberpad = document.querySelector(".numpad");
const clearButton = document.querySelector(".clear");
let formattedNumber = ["0"];
let operationIsPressed = false;
function enterNumber (e) {
     
    if(e.target.className.includes("number")){
        const digit = e.target.innerText;
        if (operationIsPressed) {
            screen.innerText = "";
            operationIsPressed = false;
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
            
            
            equation.push(formattedNumber.join(""));
            

            clearButton.innerText = "C";
        }

    }
}

// function resetOperation() {
//     e.target.style = `background-color: #FE9F06;
//                       color: white;`
// }

// function engageOperation() {
//     e.target.style = `background-color: white;`
// }

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
        operationIsPressed = true;
        equation.push(parseFloat(formattedNumber.join("")));
        equation.push(e.target.innerText)
        formattedNumber = [];
        console.log(operationIsPressed)
    }
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
numberpad.addEventListener("click", enterOperation)
