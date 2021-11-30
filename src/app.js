import express from 'express';
import cors from 'cors';
import * as memeController from './controllers/memeController.js';
import authorization from './middlewares/authorizationMiddleware.js';
const app = express();

app.use(cors());
app.use(express.json());


app.get('/memes', memeController.listMemes);
app.post('/memes', authorization, memeController.insertMeme);


app.get('/health', (req, res) => {
    res.sendStatus(200);
})

export default app;