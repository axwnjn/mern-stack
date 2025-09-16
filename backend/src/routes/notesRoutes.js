import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNotesByID,
} from "../controller/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
