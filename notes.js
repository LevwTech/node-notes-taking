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

module.exports = { getNotes, addNotes };
