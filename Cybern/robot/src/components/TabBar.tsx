import React from 'react';
import { Gamepad2, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types';

interface TabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="tab-bar" role="tablist" aria-label="Navigation">
      <button
        role="tab"
        aria-selected={activeTab === 'game'}
        className={`tab-item ${activeTab === 'game' ? 'active' : ''}`}
        onClick={() => onTabChange('game')}
      >
        <div className="tab-icon-wrapper">
          <Gamepad2 size={24} />
        </div>
        <span className="tab-label">Spiel</span>
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'rules'}
        className={`tab-item ${activeTab === 'rules' ? 'active' : ''}`}
        onClick={() => onTabChange('rules')}
      >
        <div className="tab-icon-wrapper">
          <BookOpen size={24} />
        </div>
        <span className="tab-label">Regeln</span>
      </button>
    </nav>
  );
};
