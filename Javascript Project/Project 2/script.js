const container = document.querySelector(".container"),
    form = container.querySelector("form"),
    fileInput = form.querySelector(".fileInput");

let qrImage = document.querySelector(".qr-image");
let content = document.querySelector(".content");
let details = document.querySelector(".details");

function afterScan() {
    content.style.display = "none";
    qrImage.style.display = "block";
    details.style.display = "block";
}

function fetchRequest(file, formData) {
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData,
    }).then(res => console.log(res()));
}

fileInput.addEventListener("change", e => {
    let file = e.target.files;
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    fetchRequest(file, formData);
});

form.addEventListener("click", () => fileInput.click());