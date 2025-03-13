import express, { Request, Response } from 'express';
import {Container} from "../src/Container";

const containerCdl = await Container.create('Richard_CDL');

const port = +(process.env.PORT || 3000);
const app = express();

app.use(express.static('web/assets'))
app.set('view engine', 'ejs');
app.set('views', 'web/views');

app.get('/', async (req: Request, res: Response) => {
    res.render('pages/index');
});

app.get('/bank', async (req: Request, res: Response) => {
    const bank = await containerCdl.client.getBank();

    res.render('pages/bank', { bank });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
