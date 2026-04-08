export class Gericht {
  constructor(name, kalorien, makros, allergene = [], istVegetarisch = false) {
    this.name = name;
    this.kalorien = kalorien;
    this.makros = makros;
    this.allergene = allergene;
    this.istVegetarisch = istVegetarisch;
  }

  istGeeignet(profil) {
    if (profil.allergene) {
      for (let allergen of this.allergene) {
        if (profil.allergene.includes(allergen)) {
          return false;
        }
      }
    }
    
    if (profil.spezielleDiaet === 'Vegetarisch' && !this.istVegetarisch) {
      return false;
    }
    
    return true;
  }
}