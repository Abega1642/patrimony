import {readFile} from '../../../data/index.js'
import { DATA_JSON_FILE_PATH } from '../../constant/dataJSON.js';

export default async function getAllPossessions () {
    const possessions = await readFile(DATA_JSON_FILE_PATH);
    return possessions.data[1].data.possessions;
}

