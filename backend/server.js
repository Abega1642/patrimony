import express from 'express';
import cors from 'cors';
import getAllPossessions from './getAllPossessions.js';
import { readFile, writeFile } from '../data/index.js';
import { getPatrimonyValueByDate } from './patrimonyValue.js';
import { updatePossessionByLibelle } from './updatePossessionByLibelle.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/possession', async (req, res) => {
  try {
    const possessions = await getAllPossessions()
    res.status(200).json(possessions);
  } catch (err) {
    res.status(500).json({ status: "Possessions retrievement failed.", error: err.message });
  }
});

app.post('/possession', async (req, res) => {
  try {
      const newPossession = req.body;
      const data = await readFile('../data/data.json');
      const possessions = data.data[1].data.possessions;
      possessions.push(newPossession);

      await writeFile('../data/data.json', data.data);

      res.status(201).json({ message: "Possession ajoutée avec succès", possession: newPossession });
  } catch (error) {
    res.status(500).json({ status: "Possessions creation failed.", error: error.message });
  }
});

app.get('/patrimoine/:date', async (req, res) => {
  try {
    let date = req.params.date;
    date = new Date(date);

    const value = await getPatrimonyValueByDate(date);
    
    res.status(200).json({value : value});
  } catch(err) {
    res.status(500).json({status: "Error while computing patrimony value", error: err.message})
  }
})

app.put('/possession/:libelle', async (req, res) => {
  try {
    let libelle = req.params.libelle;
    
    libelle = libelle.slice(1);
    
    const result = await updatePossessionByLibelle(libelle, req.body);

    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({status: "Error while computing update value", error: err.message})
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
