const addbox = document.querySelector(".addNote"),
    popupBox = document.querySelector(".popup-window"),
    popupTitle = document.querySelector(".header p"),
    cross = document.querySelector(".uil-times"),
    btn = document.querySelector("button"),
    titleTag = document.querySelector("input"),
    descriptionTag = document.querySelector("textarea"),
    settingTag = document.querySelector(".setting"),
    menu = document.querySelector(".menu");


let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const Notes = JSON.parse(localStorage.getItem("Notes") || "[]");

let isUpdate = false,
    updateId;
addbox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.style.display = "block";
})


cross.addEventListener("click", () => {
    popupBox.style.display = "none";
    titleTag.value = "";
    descriptionTag.value = "";
    btn.innerText = "Add Note";
    popupTitle.innerText = "Add A Note";
    isUpdate = false;

})
btn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value,
        description = descriptionTag.value;

    if (title || description) {
        let newDate = new Date(),
            month = months[newDate.getMonth()],
            day = newDate.getDate(),
            year = newDate.getFullYear();
        let newNote = {
            title: title,
            description: description,
            date: `${month} ${day} ${year}`
        };
        if (!isUpdate) {
            Notes.push(newNote);
        } else {
            Notes[updateId] = newNote;
        }
        localStorage.setItem("Notes", JSON.stringify(Notes));
        cross.click();
    }
    showNotes();
})

function showNotes() {

    document.querySelectorAll(".notes").forEach(note => note.remove());
    Notes.forEach((note, index) => {
        let liTag = `<li class="notes">
                     <h1>${note.title}</h1>
                     <p class="description">${note.description}</p>
                     <div class="bottom-content">
                     <p>${note.date}</p>
                     <i class="uil uil-ellipsis-h setting"></i>
                     <ul class="menu">
                    <li onclick="editNote(${index},'${note.title}','${note.description}')"> <i  class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"> <i  class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </li>`
        addbox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function deleteNote(noteId) {
    let confirmDelete = confirm("Are You Sure Do You Want To Delete This Note");
    if (!confirmDelete) return;
    Notes.splice(noteId, 1);
    localStorage.setItem("Notes", JSON.stringify(Notes));
    showNotes();
}

function editNote(noteId, title, description) {
    isUpdate = true;
    updateId = noteId;
    addbox.click();
    btn.innerText = "Update Note";
    popupTitle.innerText = "Update A Note";
    titleTag.value = title;
    descriptionTag.value = description;

}