import { Router, Request, Response } from "express";
import { analizarLexico } from "../controllers/lexicoController";


const router = Router();

router.post("/analizar", analizarLexico);

router.get('/', (req: Request, res: Response) => {
  res.render('index'); // <-- renderiza views/index.ejs
});

router.get("/errores", (req, res) => {
  res.render("errores");
});

export default router;
