import Note from "../models/Note.js";

async function getAllNotes(req, res) {
  try {
    const note = await Note.find();
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: error.message });
  }
}

async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = await new Note({ title, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Error creating data" });
  }
}

async function updateNote(req, res) {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    const update = await Note.findByIdAndUpdate(
      id,
      { title: title, content: content },
      { new: true }
    );

    if (!update) return res.status(404).json({ message: "not found" });

    res.status(200).json(update);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Error updating data" });
  }
}

async function deleteNote(req, res) {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNote) return res.status(404).json({ message: "id not found" });

    res.status(200).json({ deleted: deleteNote });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Error deleting data" });
  }
}

export { getAllNotes, createNote, updateNote, deleteNote };
