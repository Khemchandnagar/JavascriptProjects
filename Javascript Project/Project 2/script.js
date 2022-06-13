const container = document.querySelector(".container"),
    form = container.querySelector("form"),
    fileInput = form.querySelector("input");

let qrImage = document.querySelector(".qr-image");
let content = document.querySelector(".content");
let details = document.querySelector(".details");

function afterScan() {
    content.style.display = "none";
    qrImage.style.display = "block";
    details.style.display = "block";
}

function fetchRequest(formData) {
    fetch("https://pdf.co/how-to-use-qr-code-reader-api/barcode/read/from/url", {
        method: "POST",
        body: formData,
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