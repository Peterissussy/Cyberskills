export class WochenPlan {
  constructor() {
    this.tage = {
      'Montag': [],
      'Dienstag': [],
      'Mittwoch': [],
      'Donnerstag': [],
      'Freitag': [],
      'Samstag': [],
      'Sonntag': []
    };
  }

  addGericht(tag, gericht) {
    if (this.tage[tag]) {
      this.tage[tag].push(gericht);
    }
  }

  removeGericht(tag, index) {
    if (this.tage[tag]) {
      this.tage[tag].splice(index, 1);
    }
  }

  berechneWochenKalorien() {
    let total = 0;
    Object.values(this.tage).forEach(gerichte => {
      gerichte.forEach(g => total += g.kalorien);
    });
    return total;
  }
}