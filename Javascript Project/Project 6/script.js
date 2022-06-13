const text = document.querySelector("input"),
    btn = document.querySelector("button");

btn.addEventListener("click", () => {
    let palin = text.value;
    console.log(palin[0]);
    console.log(palin.length);
})