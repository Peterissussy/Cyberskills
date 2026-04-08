import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { Controller } from './models/Controller';
import { users } from './data/users';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { ProfilBearbeiten } from './components/ProfilBearbeiten';

function App() {
  const [controller] = useState(() => new Controller());
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [selectedDay, setSelectedDay] = useState('Montag');
  const [refresh, setRefresh] = useState(0);
  const [showProfilEdit, setShowProfilEdit] = useState(false);

  const tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  const handleLogin = (user) => {
    controller.profilBearbeiten(user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    controller.profil = null;
  };

  const handleAddGericht = (tag, gericht) => {
    controller.gerichtHinzufuegen(tag, gericht);
    setRefresh(r => r + 1);
  };

  const handleRemoveGericht = (tag, index) => {
    controller.gerichtEntfernen(tag, index);
    setRefresh(r => r + 1);
  };

  const handleSaveProfil = (updatedProfil) => {
    setCurrentUser({ ...updatedProfil });
    controller.profilBearbeiten(updatedProfil);
    setShowProfilEdit(false);
    setRefresh(r => r + 1);
  };

  const getSmartRecommendations = () => {
    if (!currentUser || !currentUser.wochenplan) {
      return { gerichte: [], aktuelleKalorien: 0, verbleibendeKalorien: currentUser?.kalorien || 0 };
    }
    
    const aktuelleKalorien = currentUser.wochenplan.tage[selectedDay].reduce((sum, g) => sum + g.kalorien, 0);
    const zielKalorien = currentUser.kalorien;
    const verbleibendeKalorien = zielKalorien - aktuelleKalorien;
    
    const allePassenden = controller.empfehleGericht();
    
    const mitAbstand = allePassenden.map(gericht => ({
      gericht,
      abstand: Math.abs(gericht.kalorien - verbleibendeKalorien)
    }));
    
    mitAbstand.sort((a, b) => a.abstand - b.abstand);
    
    const sinnvolleGerichte = mitAbstand.filter(item => 
      item.gericht.kalorien <= verbleibendeKalorien + 150
    );
    
    return {
      gerichte: sinnvolleGerichte.map(item => item.gericht),
      aktuelleKalorien,
      verbleibendeKalorien
    };
  };

  // Login Screen
  if (!currentUser) {
    return <LoginScreen users={users} onLogin={handleLogin} />;
  }

  // Main App
  const wochenplan = currentUser.wochenplan;
  const { gerichte: empfohleneGerichte, aktuelleKalorien, verbleibendeKalorien } = getSmartRecommendations();

  return (
    <div className="min-h-screen bg-stone-100">
      <Header currentUser={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Profil Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-emerald-900">Dein Profil</h2>
            <button
              onClick={() => setShowProfilEdit(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Edit className="w-4 h-4" />
              Bearbeiten
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="text-sm text-emerald-800 mb-1">Täglicher Bedarf</div>
              <div className="text-2xl font-bold text-emerald-900">{currentUser.kalorien} kcal</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="text-sm text-amber-800 mb-1">Diät-Typ</div>
              <div className="text-lg font-semibold text-amber-900">{currentUser.spezielleDiaet}</div>
            </div>
            <div className="bg-stone-100 p-4 rounded-lg border border-stone-300">
              <div className="text-sm text-stone-700 mb-1">Allergene</div>
              <div className="text-lg font-semibold text-stone-900">
                {currentUser.allergene.length > 0 ? currentUser.allergene.join(', ') : 'Keine'}
              </div>
            </div>
          </div>
          <div className="mt-4 bg-stone-50 p-4 rounded-lg border border-stone-200">
            <div className="text-sm text-stone-700 mb-2 font-medium">Makronährstoffe (täglich)</div>
            <div className="flex justify-between text-sm text-stone-800">
              <div><span className="font-semibold">Protein:</span> {currentUser.makros.protein}g</div>
              <div><span className="font-semibold">Kohlenhydrate:</span> {currentUser.makros.carbs}g</div>
              <div><span className="font-semibold">Fett:</span> {currentUser.makros.fat}g</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 border border-stone-200">
          <div className="flex border-b border-stone-200">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'recommendations'
                  ? 'text-emerald-900 border-b-2 border-emerald-900 bg-emerald-50'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Gerichts-Empfehlungen
            </button>
            <button
              onClick={() => setActiveTab('weekplan')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'weekplan'
                  ? 'text-emerald-900 border-b-2 border-emerald-900 bg-emerald-50'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              Mein Wochenplan
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'recommendations' ? (
              <div>
                <h3 className="text-lg font-bold mb-4 text-emerald-900">Passende Gerichte für dich</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Zu welchem Tag hinzufügen?
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full md:w-64 p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  >
                    {tage.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                
                {/* Kalorien-Status */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-emerald-800 mb-1">Aktuell am {selectedDay}</div>
                      <div className="text-2xl font-bold text-emerald-900">{aktuelleKalorien} kcal</div>
                    </div>
                    <div>
                      <div className="text-sm text-emerald-800 mb-1">Noch benötigt</div>
                      <div className={`text-2xl font-bold ${verbleibendeKalorien > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {verbleibendeKalorien > 0 ? verbleibendeKalorien : 0} kcal
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-emerald-800 mb-1">Tagesziel</div>
                      <div className="text-2xl font-bold text-emerald-900">{currentUser.kalorien} kcal</div>
                    </div>
                  </div>
                  {verbleibendeKalorien <= 0 && (
                    <div className="mt-3 text-center text-sm text-emerald-700 font-medium">
                      ✓ Tagesziel erreicht!
                    </div>
                  )}
                </div>

                {empfohleneGerichte.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
                    <p className="text-stone-700 font-medium">
                      Tagesziel bereits erreicht! Keine weiteren Gerichte empfohlen.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-stone-600 mb-4">
                      Gerichte sortiert nach Eignung für deine verbleibenden {verbleibendeKalorien} kcal
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {empfohleneGerichte.map((gericht, idx) => {
                        const neueGesamt = aktuelleKalorien + gericht.kalorien;
                        const differenz = neueGesamt - currentUser.kalorien;
                        const istPerfekt = Math.abs(differenz) <= 50;
                        
                        return (
                          <div key={idx} className={`rounded-lg p-4 border-2 transition-all ${
                            istPerfekt 
                              ? 'bg-emerald-50 border-emerald-400 shadow-md' 
                              : 'bg-white border-stone-200 hover:shadow-md'
                          }`}>
                            {istPerfekt && (
                              <div className="text-xs font-bold text-emerald-700 mb-2">
                                ⭐ Optimale Wahl!
                              </div>
                            )}
                            <h4 className="font-semibold text-stone-900 mb-2">{gericht.name}</h4>
                            <div className="text-sm space-y-1 mb-3">
                              <div className="font-semibold text-emerald-700">{gericht.kalorien} kcal</div>
                              <div className="text-stone-600">
                                P: {gericht.makros.protein}g | K: {gericht.makros.carbs}g | F: {gericht.makros.fat}g
                              </div>
                              {gericht.allergene.length > 0 && (
                                <div className="text-amber-600">⚠ {gericht.allergene.join(', ')}</div>
                              )}
                              <div className={`font-medium text-sm ${differenz > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                Nach Hinzufügen: {neueGesamt} kcal 
                                {differenz > 0 && ` (+${differenz})`}
                                {differenz <= 0 && differenz > -50 && ' ✓'}
                              </div>
                            </div>
                            <button
                              onClick={() => handleAddGericht(selectedDay, gericht)}
                              className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-white font-medium ${
                                istPerfekt
                                  ? 'bg-emerald-600 hover:bg-emerald-700'
                                  : 'bg-emerald-800 hover:bg-emerald-900'
                              }`}
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>Hinzufügen</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold mb-4 text-emerald-900">Dein Wochenplan</h3>
                <div className="space-y-4">
                  {tage.map(tag => (
                    <div key={tag} className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-stone-900">{tag}</h4>
                        <div className="text-sm font-medium text-emerald-700">
                          {wochenplan.tage[tag].reduce((sum, g) => sum + g.kalorien, 0)} kcal
                        </div>
                      </div>
                      {wochenplan.tage[tag].length === 0 ? (
                        <p className="text-stone-500 text-sm italic">Noch keine Gerichte geplant</p>
                      ) : (
                        <div className="space-y-2">
                          {wochenplan.tage[tag].map((gericht, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-stone-200">
                              <div className="flex-1">
                                <div className="font-semibold text-stone-900">{gericht.name}</div>
                                <div className="text-sm text-stone-600">{gericht.kalorien} kcal</div>
                              </div>
                              <button
                                onClick={() => handleRemoveGericht(tag, idx)}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-900">Gesamt Wochenkalorien:</span>
                    <span className="text-3xl font-bold text-emerald-700">
                      {wochenplan.berechneWochenKalorien()} kcal
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profil-Bearbeiten Modal */}
      {showProfilEdit && (
        <ProfilBearbeiten
          profil={currentUser}
          onSave={handleSaveProfil}
          onClose={() => setShowProfilEdit(false)}
        />
      )}
    </div>
  );
}

export default App;