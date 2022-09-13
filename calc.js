const screen = document.querySelector(".screen p");
const equation = []
const numberpad = document.querySelector(".numpad")
const clearButton = document.querySelector(".clear")
function enterNumber (e) {
    console.log(e);
    if(e.target.className.includes("number")){
        screen.innerText == "0" ? screen.innerText = "" : screen.innerText == "0";
        const digit = e.target.innerText;
        equation.push(digit);
        screen.innerText += digit;

        clearButton.innerText = "C";
    }
}

function clearScreen (e) {
    if(e.target.className.includes("clear")){   
        screen.innerText = "0"
        clearButton.innerText = "AC"
    }
}
function operator () {
    if(e.target.className.includes("number")){

    }
}

numberpad.addEventListener("click", enterNumber)
numberpad.addEventListener("click", clearScreen)
