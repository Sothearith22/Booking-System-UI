import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  X 
} from 'lucide-react';

const Alert = ({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = "" 
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="text-blue-500" size={20} />,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle2 className="text-green-500" size={20} />,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="text-yellow-500" size={20} />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="text-red-500" size={20} />,
    },
  };

  const style = styles[type];

  return (
    <div className={`p-4 rounded-xl border ${style.bg} ${style.border} ${style.text} animate-in fade-in slide-in-from-top ${className}`}>
      <div className="flex gap-3">
        <div className="shrink-0">{style.icon}</div>
        <div className="flex-1">
          {title && <h3 className="font-bold text-sm mb-1">{title}</h3>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="shrink-0 hover:bg-black/5 p-1 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
