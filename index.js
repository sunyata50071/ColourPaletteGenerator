const userInput = document.getElementById("seed-colour")
const generateColoursBtn = document.getElementById("get-colours")
const displayColours = document.getElementById("colour-value")
const displayHexCode = document.getElementById("hex-value")
const mode = document.getElementById("colour-scheme")


generateColoursBtn.addEventListener("click", getColours)


document.addEventListener("click", function(e) {
    if(e.target.dataset.colour && screen.width >=576) {
        navigator.clipboard.writeText(e.target.dataset.colour)
        window.prompt("Copy to clipboard? hold Ctrl+C, then hit Enter", e.target.dataset.colour)
    }
})


getColours()


function getColours() {
    const usersChosenColour = userInput.value.substring(1)
    const usersChosenColourScheme = mode.value
    let chosenColour = []
    fetch(`https://www.thecolorapi.com/scheme?hex=${usersChosenColour}&mode=${usersChosenColourScheme}&count=5`)
        .then(response => response.json())
        .then(data => {
            for (let colour of data.colors) {
                chosenColour.push(colour.hex.clean)
            }
            displayColours.innerHTML = ``
            displayHexCode.innerHTML = ``
            renderColours(chosenColour)
        })
 }


function renderColours(chosenColour) {
    chosenColour.forEach(function(hex){
        displayColours.innerHTML += `
        <div class = "colour" data-colour=#${hex} style="background-color: #${hex}"></div>`
        displayHexCode.innerHTML += `<p data-colour=#${hex}>#${hex}</p>`  
    })
}
