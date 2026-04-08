import React, { useState } from 'react';
import { X, Save, Calculator } from 'lucide-react';

export function ProfilBearbeiten({ profil, onSave, onClose }) {
  const [kalorien, setKalorien] = useState(profil.kalorien);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Für die Berechnung
  const [geschlecht, setGeschlecht] = useState('männlich');
  const [alter, setAlter] = useState(25);
  const [groesse, setGroesse] = useState(175);
  const [gewicht, setGewicht] = useState(75);
  const [aktivitaet, setAktivitaet] = useState('moderat');
  const [ziel, setZiel] = useState('halten');

  // Harris-Benedict-Formel + Aktivitätsfaktor
  const berechneKalorien = () => {
    let grundumsatz;
    
    // Grundumsatz berechnen
    if (geschlecht === 'männlich') {
      grundumsatz = 66.47 + (13.7 * gewicht) + (5 * groesse) - (6.8 * alter);
    } else {
      grundumsatz = 655.1 + (9.6 * gewicht) + (1.8 * groesse) - (4.7 * alter);
    }
    
    // Aktivitätsfaktor
    const aktivitaetsFaktoren = {
      'sitzend': 1.2,
      'leicht': 1.375,
      'moderat': 1.55,
      'aktiv': 1.725,
      'sehr_aktiv': 1.9
    };
    
    let gesamtumsatz = grundumsatz * aktivitaetsFaktoren[aktivitaet];
    
    // Ziel anpassen
    if (ziel === 'abnehmen') {
      gesamtumsatz -= 500; // Defizit von 500 kcal
    } else if (ziel === 'zunehmen') {
      gesamtumsatz += 500; // Überschuss von 500 kcal
    }
    
    return Math.round(gesamtumsatz);
  };

  const handleBerechnen = () => {
    const berechnet = berechneKalorien();
    setKalorien(berechnet);
  };

  const handleSave = () => {
    profil.kalorien = kalorien;
    onSave(profil);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-emerald-900 text-white p-6 rounded-t-xl flex items-center justify-between">
          <h2 className="text-2xl font-bold">Profil bearbeiten</h2>
          <button onClick={onClose} className="p-2 hover:bg-emerald-800 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Aktuelle Werte */}
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
            <div className="text-sm text-stone-600 mb-1">Aktueller Benutzer</div>
            <div className="font-bold text-lg text-emerald-900">{profil.username}</div>
            <div className="text-sm text-stone-600 mt-2">{profil.spezielleDiaet}</div>
          </div>

          {/* Toggle zwischen manueller Eingabe und Rechner */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowCalculator(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                !showCalculator 
                  ? 'bg-emerald-800 text-white' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Manuelle Eingabe
            </button>
            <button
              onClick={() => setShowCalculator(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                showCalculator 
                  ? 'bg-emerald-800 text-white' 
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Berechnen
            </button>
          </div>

          {!showCalculator ? (
            // Manuelle Eingabe
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Täglicher Kalorienbedarf (kcal)
              </label>
              <input
                type="number"
                value={kalorien}
                onChange={(e) => setKalorien(parseInt(e.target.value) || 0)}
                className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold"
                min="500"
                max="5000"
              />
              <p className="text-sm text-stone-600 mt-2">
                Gib deinen gewünschten täglichen Kalorienbedarf ein
              </p>
            </div>
          ) : (
            // Kalorien-Rechner
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Automatische Berechnung
                </h3>
                <p className="text-sm text-amber-800">
                  Basierend auf der Harris-Benedict-Formel
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Geschlecht
                  </label>
                  <select
                    value={geschlecht}
                    onChange={(e) => setGeschlecht(e.target.value)}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="männlich">Männlich</option>
                    <option value="weiblich">Weiblich</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Alter (Jahre)
                  </label>
                  <input
                    type="number"
                    value={alter}
                    onChange={(e) => setAlter(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    min="10"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Größe (cm)
                  </label>
                  <input
                    type="number"
                    value={groesse}
                    onChange={(e) => setGroesse(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    min="100"
                    max="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Gewicht (kg)
                  </label>
                  <input
                    type="number"
                    value={gewicht}
                    onChange={(e) => setGewicht(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    min="30"
                    max="300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Aktivitätslevel
                </label>
                <select
                  value={aktivitaet}
                  onChange={(e) => setAktivitaet(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sitzend">Sitzend (wenig/keine Bewegung)</option>
                  <option value="leicht">Leicht aktiv (1-3x Sport/Woche)</option>
                  <option value="moderat">Moderat aktiv (3-5x Sport/Woche)</option>
                  <option value="aktiv">Sehr aktiv (6-7x Sport/Woche)</option>
                  <option value="sehr_aktiv">Extrem aktiv (Profisport/körperliche Arbeit)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Dein Ziel
                </label>
                <select
                  value={ziel}
                  onChange={(e) => setZiel(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="abnehmen">Abnehmen (-500 kcal)</option>
                  <option value="halten">Gewicht halten</option>
                  <option value="zunehmen">Zunehmen (+500 kcal)</option>
                </select>
              </div>

              <button
                onClick={handleBerechnen}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Kalorien berechnen
              </button>

              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4">
                <div className="text-sm text-emerald-800 mb-1">Berechneter Kalorienbedarf</div>
                <div className="text-3xl font-bold text-emerald-900">{kalorien} kcal</div>
                <div className="text-xs text-emerald-700 mt-2">
                  Dieser Wert wird nach dem Speichern übernommen
                </div>
              </div>
            </div>
          )}

          {/* Speichern Button */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            <button
              onClick={onClose}
              className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-800 py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}