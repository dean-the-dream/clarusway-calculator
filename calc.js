const screen = document.querySelector(".screen p");
let display = "0";
const equation = [];
const numberpad = document.querySelector(".numpad");
const clearButton = document.querySelector(".clear");
let formattedNumber = [];
function enterNumber (e) {
    console.log(e);
    if(e.target.className.includes("number")){
        if(formattedNumber.length < 9){
            const digit = e.target.innerText;
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

function resetOperation(e) {
    e.target.style = ``
}

function pressClear (e) {
    if(e.target.className.includes("clear")){   
        screen.innerText = "0"
        formattedNumber = [];
        clearButton.innerText = "AC"
    }
}

function addition () {
    if(e.target.className.includes("number")){

    }
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", pressClear)
