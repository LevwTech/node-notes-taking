const fs = require("fs");
const getNotes = function () {
  return "Your notes...";
};

function addNotes(title, body) {
  const notes = loadNotes();
  const dublicateNotes = notes.filter((note) => note.title === title);
  if (dublicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log("added note");
  } else {
    console.log("Title already taken!");
  }
}
function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}
function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
}
function removeNote(title) {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (newNotes.length === notes.length) {
    console.log("No notes with that title");
    return;
  }
  saveNotes(newNotes);
  console.log("removed note");
}
module.exports = { getNotes, addNotes, removeNote };
