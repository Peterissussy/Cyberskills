import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { TabBar } from './components/TabBar';
import { RoboFight } from './components/RoboFight';
import { Rules } from './components/Rules';

export const App: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('robo_fight_theme');
    if (saved) return saved === 'dark';
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  // Tab state (read initial from hash if available)
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (window.location.hash === '#rules' || window.location.pathname.endsWith('/rules')) {
      return 'rules';
    }
    return 'game';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('robo_fight_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('robo_fight_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'rules') {
      window.history.replaceState(null, '', '#rules');
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className={`app-root ${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <main className="main-content">
        <div className="content-container">
          {activeTab === 'game' && <RoboFight />}
          {activeTab === 'rules' && <Rules />}
        </div>
      </main>

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;
