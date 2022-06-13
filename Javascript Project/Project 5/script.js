const textUrl = document.querySelector("input"),
    btn = document.querySelector("button");
btn.addEventListener("click", () => {
    document.querySelector("img").remove();
    let imageUrl = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${textUrl.value}&amp;size=200x200" alt="" title="" />`;
    btn.insertAdjacentHTML("afterend", imageUrl);
    document.querySelector("img").style.margin = "20px auto";
});