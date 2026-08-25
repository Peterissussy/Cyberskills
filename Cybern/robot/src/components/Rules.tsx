import React from 'react';
import { BookOpen, Swords, Zap, Shield, Sparkles, UserCheck, HelpCircle } from 'lucide-react';

export const Rules: React.FC = () => {
  return (
    <div className="rules-container">
      <div className="page-header">
        <h2 className="page-title">
          <BookOpen className="inline-icon" size={26} />
          Spielregeln
        </h2>
        <p className="page-subtitle">
          Alles, was du über das rundenbasierte Taktikspiel Robo Fight wissen musst.
        </p>
      </div>

      <div className="rules-cards-list">
        {/* Grundidee */}
        <div className="card rule-card">
          <div className="rule-card-header">
            <div className="rule-icon-box bg-blue">
              <Sparkles size={20} />
            </div>
            <h3 className="card-title">Grundidee</h3>
          </div>
          <p className="rule-text">
            Zwei Spieler bauen je einen Roboter mit drei Werten: <strong>Stärke (Strength)</strong>, <strong>Geschwindigkeit (Speed)</strong> und <strong>Haltbarkeit (Durability)</strong>.
          </p>
          <p className="rule-text">
            Die Roboter treten gegeneinander an; der höhere Kampf-Score gewinnt die Runde.
          </p>
        </div>

        {/* Schere-Stein-Papier */}
        <div className="card rule-card">
          <div className="rule-card-header">
            <div className="rule-icon-box bg-purple">
              <Swords size={20} />
            </div>
            <h3 className="card-title">Schere-Stein-Papier-Beziehung</h3>
          </div>
          <p className="rule-text">
            Die Attribute kontern sich gegenseitig wie in einem Taktik-Kreislauf:
          </p>
          <ul className="rule-list">
            <li>
              <Swords size={16} className="text-red" />
              <span><strong>Stärke</strong> wird schwächer, wenn der Gegner viel <strong>Haltbarkeit</strong> hat.</span>
            </li>
            <li>
              <Zap size={16} className="text-yellow" />
              <span><strong>Geschwindigkeit</strong> wird schwächer, wenn der Gegner viel <strong>Stärke</strong> hat.</span>
            </li>
            <li>
              <Shield size={16} className="text-green" />
              <span><strong>Haltbarkeit</strong> wird schwächer, wenn der Gegner viel <strong>Geschwindigkeit</strong> hat.</span>
            </li>
          </ul>
          <div className="formula-box">
            <div className="formula-title">Berechnung des Kampf-Scores:</div>
            <code>
              deine Stärke × (20 − gegnerische Haltbarkeit) +<br />
              deine Geschwindigkeit × (20 − gegnerische Stärke) +<br />
              deine Haltbarkeit × (20 − gegnerische Geschwindigkeit)
            </code>
          </div>
        </div>

        {/* Ablauf einer Runde */}
        <div className="card rule-card">
          <div className="rule-card-header">
            <div className="rule-icon-box bg-amber">
              <HelpCircle size={20} />
            </div>
            <h3 className="card-title">Ablauf einer Runde</h3>
          </div>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Deklaration (Bluff)</strong>
                <p>
                  Jeder wählt heimlich drei Zahlen zwischen 0 und 20 (nur Ankündigung / Bluff). Beide sehen die Deklarationen danach öffentlich.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Echter Build</strong>
                <p>
                  Jeder trägt heimlich die echten Werte ein. Die Summe der drei Werte muss <strong>genau 20</strong> sein. <strong>Mindestens ein Wert</strong> muss mit der eigenen Deklaration übereinstimmen.
                </p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Kampf & Auswertung</strong>
                <p>
                  Es werden die Kampf-Scores berechnet; wer höher liegt, gewinnt die Runde. Am Anfang legst du fest, wie viele Runden gespielt werden; nach der letzten Runde zählt, wer mehr Runden gewonnen hat (bei Gleichstand ist das Match unentschieden).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lokal spielen */}
        <div className="card rule-card">
          <div className="rule-card-header">
            <div className="rule-icon-box bg-emerald">
              <UserCheck size={20} />
            </div>
            <h3 className="card-title">Lokal spielen (Pass & Play)</h3>
          </div>
          <p className="rule-text">
            Gerät abgeben: zuerst Spieler 1 für Deklaration und Build, dann Spieler 2.
          </p>
        </div>
      </div>
    </div>
  );
};
