const screen = document.querySelector(".screen p");
const equation = []
const numberpad = document.querySelector(".numpad")
function enterNumber (e) {
    console.log(e);
    if(e.target.className.includes("number")){
        const digit = e.target.innerText
        equation.push(digit);
        screen.innerText += digit;
    }
}

numberpad.addEventListener("click", enterNumber)
