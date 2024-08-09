import { readFile, writeFile } from "./data/index.js";
import Patrimoine from "./models/Patrimoine.js";
import Personne from "./models/Personne.js";
import Flux from "./models/possessions/Flux.js";
import Possession from "./models/possessions/Possession.js";
const john = new Personne("John Doe");

const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2023-12-25"), null, 5);
const Clothes = new Possession(john, "Clothes", 2000000, new Date("2023-12-25"), null, 10);
const savingsAccount = new Possession(john, "SavingsAccount", 500000, new Date("2023-12-25"), null, -5);
const salaire = new Flux(john,"Alternance",500_000,new Date("2023-1-1"),null,0,1);
const traindevie = new Flux(john,"Survie",-300_000,new Date("2023-1-1"),null,0,2);
const possessions = [macBookPro,, Clothes, savingsAccount,salaire,traindevie];


const johnPatrimoine  = new Patrimoine(john,possessions);

function save(personne, patrimoine) {
  const file = []
  file.push({
    model: "Personne",
    data: personne
  })
  file.push({
    model: "Patrimoine",
    data: patrimoine
  })
  return writeFile("./data.json", file)

}
function read(path) {
  return readFile(path)
}

export {save, read}