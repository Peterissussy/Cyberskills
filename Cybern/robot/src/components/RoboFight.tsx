import React, { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  Swords,
  Users,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import { GamePhase, RobotStats, RoundLog, MatchScores } from '../types';
import {
  INITIAL_STATS,
  parseStatInput,
  calculateScore,
  validateDeclaration,
  validateBuild,
} from '../utils/combat';
import { StatInputCard } from './StatInputCard';
import { ModalAlert } from './ModalAlert';

export const RoboFight: React.FC = () => {
  // Game Setup State
  const [roundsInput, setRoundsInput] = useState<string>('1');
  const [p1Name, setP1Name] = useState<string>('Spieler 1');
  const [p2Name, setP2Name] = useState<string>('Spieler 2');

  // Game Engine State
  const [phase, setPhase] = useState<GamePhase>('settings');
  const [p1Decl, setP1Decl] = useState<RobotStats>(INITIAL_STATS);
  const [p2Decl, setP2Decl] = useState<RobotStats>(INITIAL_STATS);
  const [p1Build, setP1Build] = useState<RobotStats>(INITIAL_STATS);
  const [p2Build, setP2Build] = useState<RobotStats>(INITIAL_STATS);

  const [scores, setScores] = useState<MatchScores>({ p1: 0, p2: 0 });
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [, setRoundHistory] = useState<RoundLog[]>([]);
  const [resultText, setResultText] = useState<string>('');

  // Form Input States
  const [p1Strength, setP1Strength] = useState<string>('0');
  const [p1Speed, setP1Speed] = useState<string>('0');
  const [p1Durability, setP1Durability] = useState<string>('0');

  const [p2Strength, setP2Strength] = useState<string>('0');
  const [p2Speed, setP2Speed] = useState<string>('0');
  const [p2Durability, setP2Durability] = useState<string>('0');

  // Modal Alert State
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  const totalRounds = Math.max(1, Number(roundsInput) || 1);

  const showAlert = (message: string, title = 'Fehler') => {
    setAlertState({ isOpen: true, title, message });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  const resetInputFields = () => {
    setP1Strength('0');
    setP1Speed('0');
    setP1Durability('0');
    setP2Strength('0');
    setP2Speed('0');
    setP2Durability('0');
  };

  // Start new match
  const handleStartGame = () => {
    setRoundHistory([]);
    setScores({ p1: 0, p2: 0 });
    setCurrentRound(1);
    setResultText('');
    resetInputFields();
    setPhase('p1decl');
  };

  // Player 1 submit declaration
  const handleP1DeclSubmit = () => {
    const stats: RobotStats = {
      strength: parseStatInput(p1Strength),
      speed: parseStatInput(p1Speed),
      durability: parseStatInput(p1Durability),
    };
    const error = validateDeclaration(stats);
    if (error) {
      showAlert(error);
      return;
    }
    setP1Decl(stats);
    resetInputFields();
    setPhase('p2decl');
  };

  // Player 2 submit declaration
  const handleP2DeclSubmit = () => {
    const stats: RobotStats = {
      strength: parseStatInput(p2Strength),
      speed: parseStatInput(p2Speed),
      durability: parseStatInput(p2Durability),
    };
    const error = validateDeclaration(stats);
    if (error) {
      showAlert(error);
      return;
    }
    setP2Decl(stats);
    resetInputFields();
    setPhase('showdecl');
  };

  // Move from show declarations to P1 build
  const handleShowDeclNext = () => {
    resetInputFields();
    setPhase('p1build');
  };

  // Player 1 submit real build
  const handleP1BuildSubmit = () => {
    const stats: RobotStats = {
      strength: parseStatInput(p1Strength),
      speed: parseStatInput(p1Speed),
      durability: parseStatInput(p1Durability),
    };
    const error = validateBuild(p1Decl, stats);
    if (error) {
      showAlert(error);
      return;
    }
    setP1Build(stats);
    resetInputFields();
    setPhase('p2build');
  };

  // Player 2 submit real build & trigger battle calculation
  const handleP2BuildSubmit = () => {
    const p2Stats: RobotStats = {
      strength: parseStatInput(p2Strength),
      speed: parseStatInput(p2Speed),
      durability: parseStatInput(p2Durability),
    };
    const error = validateBuild(p2Decl, p2Stats);
    if (error) {
      showAlert(error);
      return;
    }
    setP2Build(p2Stats);

    // Compute battle scores
    const p1Score = calculateScore(p1Build, p2Stats);
    const p2Score = calculateScore(p2Stats, p1Build);

    let roundText = `Unentschieden (${p1Score} : ${p2Score})`;
    let winner: 'player1' | 'player2' | 'draw' = 'draw';
    const nextScores = { ...scores };

    if (p1Score > p2Score) {
      roundText = `${p1Name} gewinnt die Runde (${p1Score} : ${p2Score})`;
      winner = 'player1';
      nextScores.p1 += 1;
    } else if (p2Score > p1Score) {
      roundText = `${p2Name} gewinnt die Runde (${p2Score} : ${p1Score})`;
      winner = 'player2';
      nextScores.p2 += 1;
    }

    const roundLog: RoundLog = {
      roundIndex: currentRound,
      declaration: { player1: { ...p1Decl }, player2: { ...p2Decl } },
      build: { player1: { ...p1Build }, player2: { ...p2Stats } },
      scores: { player1: p1Score, player2: p2Score },
      roundWinner: winner,
    };

    setRoundHistory((prev) => [...prev, roundLog]);
    setResultText(roundText);
    setScores(nextScores);

    if (currentRound >= totalRounds) {
      setPhase('matchResult');
    } else {
      setPhase('result');
    }
  };

  // Next round
  const handleNextRound = () => {
    resetInputFields();
    setP1Decl(INITIAL_STATS);
    setP2Decl(INITIAL_STATS);
    setP1Build(INITIAL_STATS);
    setP2Build(INITIAL_STATS);
    setCurrentRound((prev) => prev + 1);
    setPhase('p1decl');
  };

  // Return to settings
  const handleBackToStart = () => {
    setPhase('settings');
    resetInputFields();
    setP1Decl(INITIAL_STATS);
    setP2Decl(INITIAL_STATS);
    setP1Build(INITIAL_STATS);
    setP2Build(INITIAL_STATS);
    setResultText('');
    setScores({ p1: 0, p2: 0 });
    setCurrentRound(1);
    setRoundHistory([]);
  };

  return (
    <div className="game-container">
      {/* Match Active Status Banner */}
      {phase !== 'settings' && phase !== 'matchResult' && (
        <div className="match-status-banner">
          <div className="status-item">
            <span className="status-label">Runde {currentRound} / {totalRounds}</span>
          </div>
          <div className="status-score">
            <span className="score-p1">{p1Name} <strong>{scores.p1}</strong></span>
            <span className="score-divider">:</span>
            <span className="score-p2"><strong>{scores.p2}</strong> {p2Name}</span>
          </div>
        </div>
      )}

      {/* 1. SETTINGS PHASE */}
      {phase === 'settings' && (
        <div className="card settings-card">
          <div className="card-header">
            <div className="card-icon-box bg-blue">
              <Gamepad2 size={22} />
            </div>
            <div>
              <h2 className="card-title">Lokal spielen</h2>
              <p className="card-subtitle">
                Zwei Spieler, ein Gerät. Wähle Runden und Spielernamen.
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Anzahl Runden</label>
            <input
              type="number"
              min="1"
              max="99"
              className="input text-input"
              value={roundsInput}
              onChange={(e) => setRoundsInput(e.target.value)}
              placeholder="Anzahl Runden (z.B. 2)"
            />
            <p className="hint-text">
              Es werden genau <strong>{totalRounds}</strong> Runde(n) gespielt. Gewonnen hat, wer am Ende mehr Runden gewonnen hat.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Spielername 1</label>
            <div className="input-with-icon">
              <Users size={18} className="input-icon" />
              <input
                type="text"
                className="input text-input with-icon"
                value={p1Name}
                onChange={(e) => setP1Name(e.target.value)}
                placeholder="Spielername 1"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Spielername 2</label>
            <div className="input-with-icon">
              <Users size={18} className="input-icon" />
              <input
                type="text"
                className="input text-input with-icon"
                value={p2Name}
                onChange={(e) => setP2Name(e.target.value)}
                placeholder="Spielername 2"
              />
            </div>
          </div>

          <button className="btn btn-primary btn-large" onClick={handleStartGame}>
            <span>Spiel starten</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* 2. PLAYER 1 DECLARATION */}
      {phase === 'p1decl' && (
        <div className="phase-wrapper">
          <div className="handover-notice p1-theme">
            <span className="handover-icon">📱</span>
            <span>Gib das Gerät an <strong>{p1Name}</strong></span>
          </div>

          <div className="info-box">
            <strong>Schritt 1 (Bluff/Deklaration):</strong> Wähle 3 beliebige Zahlen zwischen 0 und 20. Dies ist deine öffentliche Ankündigung.
          </div>

          <StatInputCard
            title={`${p1Name} Deklaration`}
            strength={p1Strength}
            speed={p1Speed}
            durability={p1Durability}
            onStrengthChange={setP1Strength}
            onSpeedChange={setP1Speed}
            onDurabilityChange={setP1Durability}
          />

          <button className="btn btn-primary btn-large" onClick={handleP1DeclSubmit}>
            <span>Weiter</span>
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 3. PLAYER 2 DECLARATION */}
      {phase === 'p2decl' && (
        <div className="phase-wrapper">
          <div className="handover-notice p2-theme">
            <span className="handover-icon">📱</span>
            <span>Gib das Gerät an <strong>{p2Name}</strong></span>
          </div>

          <div className="info-box">
            <strong>Schritt 1 (Bluff/Deklaration):</strong> Wähle 3 beliebige Zahlen zwischen 0 und 20. Dies ist deine öffentliche Ankündigung.
          </div>

          <StatInputCard
            title={`${p2Name} Deklaration`}
            strength={p2Strength}
            speed={p2Speed}
            durability={p2Durability}
            onStrengthChange={setP2Strength}
            onSpeedChange={setP2Speed}
            onDurabilityChange={setP2Durability}
          />

          <button className="btn btn-primary btn-large" onClick={handleP2DeclSubmit}>
            <span>Deklarationen zeigen</span>
            <Eye size={20} />
          </button>
        </div>
      )}

      {/* 4. SHOW PUBLIC DECLARATIONS */}
      {phase === 'showdecl' && (
        <div className="phase-wrapper">
          <div className="card public-decl-card">
            <div className="card-header">
              <div className="card-icon-box bg-purple">
                <Eye size={22} />
              </div>
              <h2 className="card-title">Öffentliche Deklaration</h2>
            </div>

            <p className="card-subtitle">
              Beide Spieler sehen jetzt die angekündigten Werte:
            </p>

            <div className="decl-display-box">
              <div className="player-decl-row">
                <span className="player-decl-name">{p1Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p1Decl.strength}</span>
                  <span className="stat-pill speed">Sp {p1Decl.speed}</span>
                  <span className="stat-pill durability">D {p1Decl.durability}</span>
                </div>
              </div>

              <div className="player-decl-row">
                <span className="player-decl-name">{p2Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p2Decl.strength}</span>
                  <span className="stat-pill speed">Sp {p2Decl.speed}</span>
                  <span className="stat-pill durability">D {p2Decl.durability}</span>
                </div>
              </div>
            </div>

            <div className="info-box mt-2">
              <strong>Nächster Schritt:</strong> Jetzt trägt jeder heimlich seinen echten Roboter-Build ein (Summe = genau 20, mind. 1 Wert muss der Deklaration entsprechen).
            </div>

            <button className="btn btn-primary btn-large" onClick={handleShowDeclNext}>
              <span>Zu echten Stats</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 5. PLAYER 1 BUILD */}
      {phase === 'p1build' && (
        <div className="phase-wrapper">
          <div className="handover-notice p1-theme">
            <span className="handover-icon">📱</span>
            <span>Gib das Gerät an <strong>{p1Name}</strong></span>
          </div>

          <div className="card mini-decl-reference">
            <div className="ref-title">Öffentliche Deklarationen:</div>
            <div className="ref-content">
              <div>{p1Name}: <strong>S {p1Decl.strength} | Sp {p1Decl.speed} | D {p1Decl.durability}</strong></div>
              <div>{p2Name}: <strong>S {p2Decl.strength} | Sp {p2Decl.speed} | D {p2Decl.durability}</strong></div>
            </div>
          </div>

          <StatInputCard
            title={`${p1Name} echter Build`}
            strength={p1Strength}
            speed={p1Speed}
            durability={p1Durability}
            onStrengthChange={setP1Strength}
            onSpeedChange={setP1Speed}
            onDurabilityChange={setP1Durability}
            isBuild={true}
            declaration={p1Decl}
          />

          <button className="btn btn-primary btn-large" onClick={handleP1BuildSubmit}>
            <span>Weiter</span>
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* 6. PLAYER 2 BUILD */}
      {phase === 'p2build' && (
        <div className="phase-wrapper">
          <div className="handover-notice p2-theme">
            <span className="handover-icon">📱</span>
            <span>Gib das Gerät an <strong>{p2Name}</strong></span>
          </div>

          <div className="card mini-decl-reference">
            <div className="ref-title">Öffentliche Deklarationen:</div>
            <div className="ref-content">
              <div>{p1Name}: <strong>S {p1Decl.strength} | Sp {p1Decl.speed} | D {p1Decl.durability}</strong></div>
              <div>{p2Name}: <strong>S {p2Decl.strength} | Sp {p2Decl.speed} | D {p2Decl.durability}</strong></div>
            </div>
          </div>

          <StatInputCard
            title={`${p2Name} echter Build`}
            strength={p2Strength}
            speed={p2Speed}
            durability={p2Durability}
            onStrengthChange={setP2Strength}
            onSpeedChange={setP2Speed}
            onDurabilityChange={setP2Durability}
            isBuild={true}
            declaration={p2Decl}
          />

          <button className="btn btn-danger btn-large" onClick={handleP2BuildSubmit}>
            <Swords size={20} />
            <span>Kampf starten</span>
          </button>
        </div>
      )}

      {/* 7. ROUND RESULT */}
      {phase === 'result' && (
        <div className="phase-wrapper">
          <div className="card result-card">
            <div className="card-header">
              <div className="card-icon-box bg-emerald">
                <Sparkles size={22} />
              </div>
              <div>
                <h2 className="card-title">Runde {currentRound} von {totalRounds} – Auswertung</h2>
              </div>
            </div>

            <div className="round-winner-highlight">
              {resultText}
            </div>

            <div className="score-summary-pill">
              Rundensiege bisher: <strong>{p1Name} {scores.p1}</strong> - <strong>{scores.p2} {p2Name}</strong>
            </div>

            <div className="stats-comparison-box">
              <div className="stats-comparison-title">Echte Werte im Kampf:</div>
              <div className="compare-player">
                <span className="compare-name">{p1Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p1Build.strength}</span>
                  <span className="stat-pill speed">Sp {p1Build.speed}</span>
                  <span className="stat-pill durability">D {p1Build.durability}</span>
                </div>
              </div>
              <div className="compare-player">
                <span className="compare-name">{p2Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p2Build.strength}</span>
                  <span className="stat-pill speed">Sp {p2Build.speed}</span>
                  <span className="stat-pill durability">D {p2Build.durability}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-large" onClick={handleNextRound}>
              <span>Nächste Runde</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 8. MATCH FINAL RESULT */}
      {phase === 'matchResult' && (
        <div className="phase-wrapper">
          <div className="card match-result-card">
            <div className="match-trophy-icon">
              <Trophy size={48} />
            </div>

            <h2 className="match-winner-title">
              {scores.p1 > scores.p2
                ? `${p1Name} gewinnt das Match!`
                : scores.p2 > scores.p1
                ? `${p2Name} gewinnt das Match!`
                : 'Unentschieden!'}
            </h2>

            <div className="match-score-badge">
              Rundensiege: {p1Name} <strong>{scores.p1}</strong> – <strong>{scores.p2}</strong> {p2Name} · {totalRounds} Runde(n)
            </div>

            <div className="last-round-info">
              Letzte Runde: {resultText}
            </div>

            <div className="stats-comparison-box mt-3">
              <div className="stats-comparison-title">Letzte echte Werte:</div>
              <div className="compare-player">
                <span className="compare-name">{p1Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p1Build.strength}</span>
                  <span className="stat-pill speed">Sp {p1Build.speed}</span>
                  <span className="stat-pill durability">D {p1Build.durability}</span>
                </div>
              </div>
              <div className="compare-player">
                <span className="compare-name">{p2Name}:</span>
                <div className="stats-badges">
                  <span className="stat-pill strength">S {p2Build.strength}</span>
                  <span className="stat-pill speed">Sp {p2Build.speed}</span>
                  <span className="stat-pill durability">D {p2Build.durability}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-large mt-3" onClick={handleBackToStart}>
              <RotateCcw size={20} />
              <span>Zurück zum Start</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Alert for Input Errors */}
      <ModalAlert
        title={alertState.title}
        message={alertState.message}
        isOpen={alertState.isOpen}
        onClose={closeAlert}
      />
    </div>
  );
};
