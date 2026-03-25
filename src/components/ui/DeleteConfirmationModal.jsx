import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import Button from './Button';
import Modal from './Modal';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title = "Confirm Deletion", message = "Are you sure you want to delete this item? This action cannot be undone.", itemName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={""}>
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl shadow-red-500/10">
           <AlertTriangle size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">{title}</h2>
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          {message} {itemName && <span className="font-black text-gray-900">"{itemName}"</span>}
        </p>

        <div className="flex gap-3 w-full">
           <Button 
             variant="ghost" 
             className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-100" 
             onClick={onClose}
           >
             Cancel
           </Button>
           <button 
             onClick={onConfirm}
             className="flex-1 bg-red-600 text-white rounded-[20px] font-black text-sm uppercase tracking-widest shadow-xl shadow-red-500/20 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
           >
              <Trash2 size={18} />
              Confirm Delete
           </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
