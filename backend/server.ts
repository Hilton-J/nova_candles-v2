import express from "express";
import "dotenv/config";
import { PORT } from "./constants/env.const";

const app = express();

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Server running 3" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
