import React, { useState } from 'react';
import { Package, Trash2, Plus, Calendar, Settings } from 'lucide-react';
import Button from '../../../components/ui/button/Button';

const AdminServiceManager = ({ services, onAdd, onDelete }) => {
  const [newService, setNewService] = useState({ name: '', price: '' });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-4 border rounded-lg bg-gray-50">
        <input
          placeholder="Service Name"
          className="p-2 border rounded"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          placeholder="Price"
          className="p-2 border rounded"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
        />
        <Button onClick={() => { onAdd(newService); setNewService({ name: '', price: '' }); }}>
          <Plus size={18} className="mr-2" /> Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div key={service.id} className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition">
            <div>
              <h4 className="font-bold">{service.name}</h4>
              <p className="text-sm text-gray-500">${service.price}</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => onDelete(service.id)}>
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServiceManager;
