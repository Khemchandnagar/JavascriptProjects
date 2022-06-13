const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    translatorButton = document.querySelector("button"),
    selectTag = document.querySelectorAll("select"),
    exchangeText = document.querySelector(".exchange"),
    icon = document.querySelectorAll(".row");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translatorButton.addEventListener("click", fetchTranslation);

function fetchTranslation() {
    let textToTranslate = fromText.value;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if (!textToTranslate) return;
    toText.setAttribute("placeholder", "Translating.....");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(
        res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
}

exchangeText.addEventListener("click", () => {
    let temp;
    temp = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = temp;
    temp = fromText.value;
    fromText.value = toText.value;
    toText.value = temp;
})

icon.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})