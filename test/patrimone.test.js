import { assert } from "chai"
import { describe, it } from "mocha"
import Flux from "../models/possessions/Flux.js"
import Personne from "../models/Personne.js"
import Possession from "../models/possessions/Possession.js"
import Argent from '../models/possessions/Argent.js'
import Patrimoine from "../models/Patrimoine.js"

const TYPE_ARGENT = {
    Courant: "Courant",
    Epargne: "Epargne",
    Espece: "Espece"
  };


describe("Test about salary evaluation", () => {

    var Ilo = new Personne("Ilo");

    it("should return 0", () => {
        
        const salary = new Flux(
            Ilo, 
            "salary", 
            1000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            3);

        assert.equal(salary.getValeur(new Date("2024-3-3")), 0);

    });
    it("should return 3991780.821917808", () => {
        
        const Ilo = new Personne("Ilo");
        const john = new Personne("John Doe");

        const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2024-2-3"), null, 5);
        const salaire = new Flux(john,"Alternance",600_000,new Date("2024-1-6"),null,null,1);

        assert.equal(macBookPro.getValeur(new Date("2024-2-18")), 3991780.821917808);

    });
    it("should return 000000", () => {
        
        const Ilo = new Personne("Ilo");
        const john = new Personne("John Doe");

        const salaire = new Flux(john,"Alternance",600_000,new Date("2024-1-6"),null,null,1);

        assert.equal(salaire.getValeur(new Date("2024-2-18")),600000);

    });



    it("should return 10_000", () => {
        const salary = new Flux(
            Ilo, 
            "salary", 
            2500,
            new Date("2024-3-3"), 
            null, 
            0, 
            4);

        assert.equal(salary.getValeur(new Date("2024-5-3")), 5000);
    });

    it("should return 2_400_000", () => {
        const salary = new Flux(
            Ilo, 
            "salary", 
            600_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            15);

        assert.equal(salary.getValeur(new Date("2024-6-14")), 1_800_000);
    });
})


describe("Test about spending evaluation", () => {
    
    var Ilo = new Personne("Ilo");

    it("should return a -100_000", () => {
        const spending = new Flux(
            Ilo, 
            "spending", 
            -100_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            1);

        assert.equal(spending.getValeur(new Date("2024-3-3")), 0);
    })

    it("should return -240_000", () => {
        const spending = new Flux(
            Ilo, 
            "spending", 
            -120_000, 
            new Date("2024-3-3"), 
            null, 
            0, 
            2);

        assert.equal(spending.getValeur(new Date("2024-4-6")), -120_000);
    });
})

describe("Test about possession increasing ration :", () => {

    var Ilo = new Personne("Ilo");

    it("should return 90_000 :", () => {
        const computer = new Possession(
            "me", 
            "salary", 
            100_000, 
            new Date("2024-3-3"), 
            null, 
            10,
        );

        assert.equal(computer.getValeur(new Date("2025-3-3")), 90_000);
    })

    it('should return 95_000', () => {
        const computer = new Possession(
            "me", 
            "salary", 
            100_000, 
            new Date("2024-3-3"), 
            null, 
            10);

        assert.equal(computer.getValeur(new Date("2024-9-3")), 95_000);
    });

    it ('should return 220_000', () => {
        const savingsAccount = new Argent(
            "me", 
            "salary", 
            200_000, 
            new Date("2024-3-3"), 
            null, 
            -10,
        TYPE_ARGENT.Epargne);

        assert.equal(savingsAccount.getValeur(new Date("2025-3-3")), 220_000)
    })
})

describe("A test for calculating the total value of all possessions using Patrimoine.getValeur", ()=>{
  it("it should return 400000", ()=>{
    const Ilo = new Personne("Ilo");
    const john = new Personne("John Doe");

    const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2024-1-6"), null, 5);
    const salaire = new Flux(john,"Alternance",500_000,new Date("2024-1-6"),null,null,1);
    const traindevie = new Flux(john,"Survie",-300_000,new Date("2024-1-6"),null,null,2)
    const possessions = [macBookPro,salaire,traindevie];
    const johnPatrimoine  = new Patrimoine(john,possessions);

    assert.equal(johnPatrimoine.getValeur(new Date("2024-1-6")), 4000000)
  })
  it("it should return 4291780,821917808", ()=>{
    const Ilo = new Personne("Ilo");
    const john = new Personne("John Doe");

    const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2024-2-3"), null, 5);
    const salaire = new Flux(john,"Alternance",600_000,new Date("2024-1-6"),null,null,1);
    const traindevie = new Flux(john,"Survie",-300_000,new Date("2024-1-6"),null,null,2)
    const possessions = [macBookPro,salaire,traindevie];
    const johnPatrimoine  = new Patrimoine(john,possessions);

    assert.equal(johnPatrimoine.getValeur(new Date("2024-2-18")), 4291780.821917808)
  })
})