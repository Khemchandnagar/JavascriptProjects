const container = document.querySelector(".container"),
    form = container.querySelector("form"),
    fileInput = form.querySelector("input")


function fetchRequest(formData) {
    fetch("https://api.hubapi.com", {
        method: "POST",
        body: formData,
        // headers: {
        //     'X-RapidAPI-Host': 'qrcode.p.rapidapi.com',
        //     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY'
        // }
    }).then(res => res.json()).then(result => {
        console.log(result);
    });
}

fileInput.addEventListener("change", e => {
    let file = e.target.files;
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(formData);
});

form.addEventListener("click", () => fileInput.click());