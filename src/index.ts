import express from 'express';
import lexicoRouter from './routers/lexicoRouter';
import path from 'path';


const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.text());
app.use(lexicoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



