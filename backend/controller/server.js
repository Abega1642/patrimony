import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from '../../data/index.js';
import { getPatrimonyValueByDate } from '../functions/patrimony/patrimonyValue.js';
import { updatePossessionByLibelle } from '../functions/possessions/updatePossessionByLibelle.js';
import { closePossession } from '../functions/possessions/closePossession.js';
import { patrimonyRangeValues } from '../functions/patrimony/patrimonyRangeValues.js';
import {DATA_JSON_FILE_PATH} from '../constant/dataJSON.js'
import getPossessionsWithValues from '../functions/possessions/getPossessionsValues.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.get('/possession', async (req, res) => {
  try {
    const possessions = await getPossessionsWithValues()
    res.status(200).json(possessions);
  } catch (err) {
    res.status(500).json({ status: "Possessions retrievement failed.", error: err.message });
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

app.post('/possession', async (req, res) => {
  try {
      const newPossession = req.body;
      const data = await readFile(DATA_JSON_FILE_PATH);
      const possessions = data.data[1].data.possessions;
      possessions.push(newPossession);

      await writeFile(DATA_JSON_FILE_PATH, data.data);

      res.status(201).json({ message: "Possession ajoutée avec succès", possession: newPossession });
  } catch (error) {
    res.status(500).json({ status: "Possessions creation failed.", error: error.message });
  }
});

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

app.patch('/possession/:libelle/close', async (req, res) => {
  try {
    let libelle = req.params.libelle;
    
    libelle = libelle.slice(1);
    
    const result = await closePossession(libelle);

    res.status(200).json(result)
  } catch(err) {
    res.status(500).json({status: "Error while computing update value", error: err.message})
  }
})

app.post('/patrimoine/range', async (req,res) => {
  try {
    const patrimonyValues = await patrimonyRangeValues(req.body.start, req.body.end, req.body.day)
    res.status(201).json(patrimonyValues);
  } catch (err) {
    res.status(500).json({ status: "Possessions retrievement failed.", error: err.message });
  }
}) 

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
