
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import analyzeRouter from "./routers/analyzeRouter";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views/pages"));

app.use("/api", analyzeRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
