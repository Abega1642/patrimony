import { readFile, writeFile } from "../data/index.js"

export async function updatePossessionByLibelle(libelle, updatedData) {
    try {
      const readResult = await readFile('../data/data.json');
      if (readResult.status === 'ERROR') {
        throw new Error(readResult.error.message);
      }
  
      const data = readResult.data;
  
      const possessions = data[1].data.possessions;
      

      const ind = possessions.findIndex(p => p.libelle === libelle);

      if (ind === -1) {
        return { status: 'ERROR', message: 'Possession not found' };
      }

      possessions[ind] = { ...possessions[ind], ...updatedData };
  
      const writeResult = await writeFile('../data/data.json', data);
      if (writeResult.status === 'ERROR') {
        throw new Error(writeResult.error.message);
      }

      return { status: 'OK', data: possessions[ind] };

    } catch (err) {

      return { status: 'ERROR', error: err.message };

    }
}