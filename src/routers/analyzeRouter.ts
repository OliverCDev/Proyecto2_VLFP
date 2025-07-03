
import { Router } from "express";
import { analizarLexico } from "../controllers/analyze.controller";

const router = Router();

router.post("/analizar", analizarLexico);

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
