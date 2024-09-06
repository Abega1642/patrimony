export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(date);
  }

  getValeurApresAmortissement(dateEvaluation) {
    dateEvaluation = new Date(dateEvaluation);
    if (dateEvaluation < this.dateDebut) {
      return 0;
    }
    const differenceDate = {
      year: dateEvaluation.getFullYear() - this.dateDebut.getFullYear(),
      month: dateEvaluation.getMonth() - this.dateDebut.getMonth(),
      day: dateEvaluation.getDate() - this.dateDebut.getDate(),
    };
  
    var raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;

    const result = this.valeur - this.valeur *(raison * this.tauxAmortissement / 100);
    return result;
  }
}
