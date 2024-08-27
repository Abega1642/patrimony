import {readFile} from '../data/index.js'

export default async function getAllPossessions () {
    const test = await readFile('../data/data.json');
    return test.data[1].data.possessions;
}