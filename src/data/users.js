import { Profil } from '../models/Profil';
import { MacroNutrients } from '../models/MacroNutrients';

export const users = [
  new Profil(
    'max_fitness',
    2500,
    ['Laktose'],
    'High Protein',
    new MacroNutrients(180, 250, 80)
  ),
  new Profil(
    'anna_health',
    1800,
    ['Gluten', 'Fisch'],
    'Vegetarisch',
    new MacroNutrients(90, 200, 60)
  )
];