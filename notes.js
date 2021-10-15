const fs = require("fs");
const chalk = require("chalk");
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
    console.log(chalk.green.inverse("added note"));
  } else {
    console.log(chalk.red.inverse("Title already taken!"));
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
    console.log(chalk.red.inverse("No notes with that title"));
    return;
  }
  saveNotes(newNotes);
  console.log(chalk.green.inverse("removed note"));
}
function listNotes() {
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log(element);
  });
}
function readNote(title) {
  const notes = loadNotes();
  const note = notes.filter((note) => note.title === title);
  if (note.length === 0) {
    console.log(chalk.red.inverse("No notes with that title"));
    return;
  }
  console.log(`${note[0].title} : ${chalk.green.inverse(note[0].body)}`);
}
module.exports = { getNotes, addNotes, removeNote, listNotes, readNote };
