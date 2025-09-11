"use client";

import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { addExistingItem } from '@/lib/features/existingSlice';
import StuffCombobox from './StuffCombobox';

interface AddItemFormProps {
  onClose?: () => void;
}

export function AddItemForm({ onClose }: AddItemFormProps) {
  const dispatch = useAppDispatch();
  const [newItemStuff, setNewItemStuff] = useState('');
  const [newItemCount, setNewItemCount] = useState('');

  const handleAddItem = () => {
    const count = parseInt(newItemCount);
    if (newItemStuff && count > 0) {
      dispatch(addExistingItem({ stuffName: newItemStuff, count }));
      setNewItemStuff('');
      setNewItemCount('');
      onClose?.();
    }
  };

  const handleCancel = () => {
    setNewItemStuff('');
    setNewItemCount('');
    onClose?.();
  };

  return (
    <div className="mb-4 p-4 border border-neutral-700 rounded-lg bg-neutral-800">
      <h3 className="text-sm font-medium text-neutral-300 mb-3">Add existing item</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <StuffCombobox
            value={newItemStuff}
            onChange={setNewItemStuff}
            placeholder="Search materials/vehicles"
          />
        </div>
        <div>
          <input
            type="number"
            min={1}
            value={newItemCount}
            onChange={(e) => setNewItemCount(e.target.value)}
            placeholder="Amount"
            className="ui-input w-full"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <button
          className="btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn-primary"
          onClick={handleAddItem}
          disabled={!newItemStuff || !newItemCount || parseInt(newItemCount) <= 0}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
