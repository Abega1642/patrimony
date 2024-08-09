import express from 'express';
import {read} from '../index.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    const data = await read('../data/data.json');
    res.json({ status: "OK", data: data });
  } catch (err) {
    res.status(500).json({ status: "Something wrong", error: err });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
