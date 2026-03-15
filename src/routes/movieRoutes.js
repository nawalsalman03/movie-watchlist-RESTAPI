import express from "express";

const router = express.Router();

// Example: GET /movies/hello
router.get("/hello", (req, res) => {
  res.json({ message: "hello from /movies/hello" });
});

export default router;
