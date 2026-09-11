import React from 'react';
import { Swords, Zap, Shield } from 'lucide-react';
import { RobotStats } from '../types';

interface StatInputCardProps {
  title: string;
  strength: string;
  speed: string;
  durability: string;
  onStrengthChange: (val: string) => void;
  onSpeedChange: (val: string) => void;
  onDurabilityChange: (val: string) => void;
  isBuild?: boolean;
  declaration?: RobotStats;
}

export const StatInputCard: React.FC<StatInputCardProps> = ({
  title,
  strength,
  speed,
  durability,
  onStrengthChange,
  onSpeedChange,
  onDurabilityChange,
  isBuild = false,
  declaration,
}) => {
  const numStrength = Number(strength) || 0;
  const numSpeed = Number(speed) || 0;
  const numDurability = Number(durability) || 0;
  const currentTotal = numStrength + numSpeed + numDurability;

  return (
    <div className="card stat-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {isBuild && (
          <div
            className={`points-badge ${
              currentTotal === 20
                ? 'badge-success'
                : currentTotal > 20
                ? 'badge-danger'
                : 'badge-warning'
            }`}
          >
            Summe: {currentTotal} / 20
          </div>
        )}
      </div>

      <div className="stat-inputs-grid">
        <div className="stat-field">
          <label className="stat-label">
            <span className="stat-icon-wrapper strength">
              <Swords size={18} />
            </span>
            <span className="stat-name">Stärke (Strength)</span>
            {declaration && (
              <span className="decl-hint">Dekl: {declaration.strength}</span>
            )}
          </label>
          <input
            type="number"
            min="0"
            max="20"
            className="input stat-input"
            placeholder="Strength (0-20)"
            value={strength}
            onChange={(e) => onStrengthChange(e.target.value)}
          />
        </div>

        <div className="stat-field">
          <label className="stat-label">
            <span className="stat-icon-wrapper speed">
              <Zap size={18} />
            </span>
            <span className="stat-name">Geschwindigkeit (Speed)</span>
            {declaration && (
              <span className="decl-hint">Dekl: {declaration.speed}</span>
            )}
          </label>
          <input
            type="number"
            min="0"
            max="20"
            className="input stat-input"
            placeholder="Speed (0-20)"
            value={speed}
            onChange={(e) => onSpeedChange(e.target.value)}
          />
        </div>

        <div className="stat-field">
          <label className="stat-label">
            <span className="stat-icon-wrapper durability">
              <Shield size={18} />
            </span>
            <span className="stat-name">Haltbarkeit (Durability)</span>
            {declaration && (
              <span className="decl-hint">Dekl: {declaration.durability}</span>
            )}
          </label>
          <input
            type="number"
            min="0"
            max="20"
            className="input stat-input"
            placeholder="Durability (0-20)"
            value={durability}
            onChange={(e) => onDurabilityChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
