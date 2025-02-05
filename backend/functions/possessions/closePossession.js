import { readFile, writeFile } from "../../../data/index.js"
import { DATA_JSON_FILE_PATH } from "../../constant/dataJSON.js";

export async function closePossession(libelle) {
    try {
      const readResult = await readFile(DATA_JSON_FILE_PATH);
      if (readResult.status === 'ERROR') {
        throw new Error(readResult.error.message);
      }
  
      const data = readResult.data;
  
      const possessions = data[1].data.possessions;
      

      const ind = possessions.findIndex(p => p.libelle === libelle);

      if (ind === -1) {
        return { status: 'ERROR', message: 'Possession not found' };
      }

      let possess = possessions[ind];
      possess.dateFin = new Date();

      possessions[ind] = { ...possessions[ind], ...possess};
  
      const writeResult = await writeFile(DATA_JSON_FILE_PATH, data);
      if (writeResult.status === 'ERROR') {
        throw new Error(writeResult.error.message);
      }

      return { status: 'OK', data: possessions[ind] };

    } catch (err) {

      return { status: 'ERROR', error: err.message };

    }
}