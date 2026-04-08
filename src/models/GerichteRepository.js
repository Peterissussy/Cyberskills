import { Gericht } from './Gericht';
import { MacroNutrients } from './MacroNutrients';

export class GerichteRepository {
  constructor() {
    this.gerichte = [
      new Gericht('Hähnchenbrust mit Reis', 450, new MacroNutrients(45, 50, 8), [], false),
      new Gericht('Lachs mit Gemüse', 520, new MacroNutrients(40, 30, 25), ['Fisch'], false),
      new Gericht('Vegetarisches Curry', 380, new MacroNutrients(15, 60, 12), [], true),
      new Gericht('Rindersteack mit Kartoffeln', 580, new MacroNutrients(50, 45, 22), [], false),
      new Gericht('Pasta Carbonara', 620, new MacroNutrients(25, 75, 28), ['Gluten', 'Laktose'], false),
      new Gericht('Thunfisch-Salat', 320, new MacroNutrients(35, 15, 18), ['Fisch'], false),
      new Gericht('Quinoa Bowl', 420, new MacroNutrients(18, 55, 15), [], true),
      new Gericht('Hähnchen-Wrap', 480, new MacroNutrients(38, 48, 16), ['Gluten'], false),
      new Gericht('Tofu-Pfanne', 360, new MacroNutrients(22, 35, 18), ['Soja'], true),
      new Gericht('Pulled Pork Burger', 680, new MacroNutrients(42, 58, 32), ['Gluten'], false),
      new Gericht('Gemüse-Lasagne', 450, new MacroNutrients(20, 55, 18), ['Laktose'], true),
      new Gericht('Linsen-Dal', 340, new MacroNutrients(18, 52, 8), [], true),
      new Gericht('Caprese-Salat', 280, new MacroNutrients(12, 15, 20), ['Laktose'], true),
      new Gericht('Veggie-Burger', 420, new MacroNutrients(22, 48, 16), [], true),
      new Gericht('Ratatouille', 220, new MacroNutrients(8, 30, 10), [], true),
      new Gericht('Pilz-Risotto', 480, new MacroNutrients(15, 65, 18), ['Laktose'], true),
    ];
  }

  findePassende(profil) {
    return this.gerichte.filter(g => g.istGeeignet(profil));
  }

  addGericht(gericht) {
    this.gerichte.push(gericht);
  }
}