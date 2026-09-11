import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ModalAlertProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({
  title = 'Hinweis',
  message,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Schließen"
        >
          <X size={20} />
        </button>
        <div className="modal-icon">
          <AlertCircle size={32} className="alert-icon" />
        </div>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <button className="btn btn-primary modal-btn" onClick={onClose}>
          Verstanden
        </button>
      </div>
    </div>
  );
};
