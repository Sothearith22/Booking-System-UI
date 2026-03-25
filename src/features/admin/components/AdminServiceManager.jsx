import React, { useState } from 'react';
import { Package, Trash2, Plus, Calendar, Settings } from 'lucide-react';
import Button from '../../../components/ui/Button';
import DeleteConfirmationModal from '../../../components/ui/DeleteConfirmationModal';

const AdminServiceManager = ({ services, onAdd, onDelete }) => {
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      onDelete(serviceToDelete.id);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <div className="flex-1 relative">
           <input
             placeholder="Service Name"
             className="w-full pl-6 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
             value={newService.name}
             onChange={(e) => setNewService({ ...newService, name: e.target.value })}
           />
        </div>
        <div className="w-full md:w-32">
           <input
             placeholder="Price"
             className="w-full pl-6 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
             value={newService.price}
             onChange={(e) => setNewService({ ...newService, price: e.target.value })}
           />
        </div>
        <Button onClick={() => { onAdd(newService); setNewService({ name: '', price: '' }); }} className="shadow-lg shadow-blue-500/10">
          <Plus size={18} className="mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="p-6 bg-white border border-gray-100 rounded-3xl flex justify-between items-center hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Package size={20} />
               </div>
               <div>
                 <h4 className="font-black text-gray-900 tracking-tight">{service.name}</h4>
                 <p className="text-xs font-bold text-blue-600">${service.price}</p>
               </div>
            </div>
            <button 
              onClick={() => setServiceToDelete(service)}
              className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
               <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <DeleteConfirmationModal 
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Service?"
        message="Are you sure you want to remove this service from the availability list?"
        itemName={serviceToDelete?.name}
      />
    </div>
  );
};

export default AdminServiceManager;
