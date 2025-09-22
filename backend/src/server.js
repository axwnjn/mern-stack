import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001; //connect to MongoDB lewat exportan db.js

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // MIDDLEWARE ngebaca JSON
app.use(ratelimiter);
app.use("/api/notes", notesRoutes); // MIDDLEWARE untuk prefix di routes

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
