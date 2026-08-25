import { RobotStats } from '../types';

export const INITIAL_STATS: RobotStats = {
  strength: 0,
  speed: 0,
  durability: 0,
};

export function parseStatInput(val: string): number {
  if (!val.trim()) return 0;
  const num = Number(val);
  return Number.isFinite(num) ? num : NaN;
}

/**
 * Combat Score Formula:
 * attacker.strength * (20 - defender.durability)
 * + attacker.speed * (20 - defender.strength)
 * + attacker.durability * (20 - defender.speed)
 */
export function calculateScore(attacker: RobotStats, defender: RobotStats): number {
  return (
    attacker.strength * (20 - defender.durability) +
    attacker.speed * (20 - defender.strength) +
    attacker.durability * (20 - defender.speed)
  );
}

export function validateDeclaration(stats: RobotStats): string | null {
  const { strength, speed, durability } = stats;
  const values = [strength, speed, durability];
  if (values.some((v) => isNaN(v) || v < 0 || v > 20 || !Number.isInteger(v))) {
    return 'Deklaration: nur ganze Zahlen zwischen 0 und 20.';
  }
  return null;
}

export function validateBuild(
  declaration: RobotStats,
  build: RobotStats
): string | null {
  const { strength, speed, durability } = build;
  const values = [strength, speed, durability];

  if (values.some((v) => isNaN(v) || v < 0 || v > 20 || !Number.isInteger(v))) {
    return 'Build: nur ganze Zahlen zwischen 0 und 20.';
  }

  const sum = strength + speed + durability;
  if (sum !== 20) {
    return `Build: Strength + Speed + Durability muss genau 20 sein (aktuell: ${sum}).`;
  }

  const matchesDeclaration =
    strength === declaration.strength ||
    speed === declaration.speed ||
    durability === declaration.durability;

  if (!matchesDeclaration) {
    return 'Mindestens 1 Wert muss mit der Deklaration übereinstimmen.';
  }

  return null;
}
