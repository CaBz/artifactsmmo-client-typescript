import express, { Request, Response } from 'express';
import {Container} from "../src/Container.js";

const container = await Container.create('Richard_CDL');
const characters = process.env.ARTIFACTS_CHARACTER.split(',');

const port = +(process.env.PORT || 3000);
const app = express();

app.use('/assets', express.static('web/assets'))
app.set('view engine', 'ejs');
app.set('views', 'web/views');

app.get('/', async (req: Request, res: Response) => {
    res.render('pages/index', { active: 'home', characters });
});

app.get('/bank', async (req: Request, res: Response) => {
    const bank = await container.client.getBank();
    bank.items.sort((a, b) => a.code.localeCompare(b.name));
    bank.items = bank.items.map((item) => ({ value: container.items.get(item.code), quantity: item.quantity}));

    res.render('pages/bank', { active: 'bank', characters, bank });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
