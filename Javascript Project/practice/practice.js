//  function to select turn

function yourTurn(current) {
    let col = document.querySelectorAll(".col");
    col.forEach((colom) => {
        colom.classList.remove("yourTurn");
    })
    current.classList.add("yourTurn");
    let index = 1;
    document.querySelector(`.player-${index} .turn`).innerHTML = "Your Turn"

}