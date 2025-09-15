function getAllNotes(req, res) {
  res.send("ashld");
}

function createNote(req, res) {
  res.status(201).json({ message: "Note created successfully!" });
}

function updateNote(req, res) {
  res.status(200).json({ message: "Note updated successfully!" });
}

function deleteNote(req, res) {
  res.status(200).json({ message: "Note deleted successfully!" });
}

export { getAllNotes, createNote, updateNote, deleteNote };
