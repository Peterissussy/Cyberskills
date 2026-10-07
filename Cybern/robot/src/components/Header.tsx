import React from 'react';
import { Bot, Moon, Sun} from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">
          <Bot size={24} />
        </div>
        <h1 className="brand-title">Robo Fight</h1>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={isDarkMode ? 'Heller Modus' : 'Dunkler Modus'}
          title={isDarkMode ? 'Heller Modus' : 'Dunkler Modus'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};
