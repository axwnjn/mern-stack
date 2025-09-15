import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = 3000;

connectDB(); //connect to MongoDB lewat exportan db.js

app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
