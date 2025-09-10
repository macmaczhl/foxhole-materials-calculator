"use client";

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { selectExistingItems, addExistingItem, removeExistingItem } from '@/lib/features/existingSlice';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { StuffIcon } from './StuffIcon';
import StuffCombobox from './StuffCombobox';

export function ExistingItems() {
  const existingItems = useAppSelector(selectExistingItems);
  const dispatch = useAppDispatch();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemStuff, setNewItemStuff] = useState('');
  const [newItemCount, setNewItemCount] = useState('');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const handleAddItem = () => {
    const count = parseInt(newItemCount);
    if (newItemStuff && count > 0) {
      dispatch(addExistingItem({ stuffName: newItemStuff, count }));
      setNewItemStuff('');
      setNewItemCount('');
      setShowAddForm(false);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeExistingItem(itemId));
  };

  const handleCancelAdd = () => {
    setNewItemStuff('');
    setNewItemCount('');
    setShowAddForm(false);
  };

  return (
    <div className="panel m-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title">Existing items</h2>
        {!showAddForm && (
          <button
            className="btn-primary inline-flex items-center"
            onClick={() => setShowAddForm(true)}
          >
            <PlusIcon className="size-4 mr-1" /> Add
          </button>
        )}
      </div>

      {showAddForm && (
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
              onClick={handleCancelAdd}
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
      )}

      {existingItems.length === 0 ? (
        <div className="text-center py-8 text-neutral-400">
          <p>No existing items added yet.</p>
          <p>Click &ldquo;Add&rdquo; to add items you already have.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {existingItems.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredItemId(item.id)}
              onMouseLeave={() => setHoveredItemId(null)}
            >
              <StuffIcon stuffName={item.stuffName} count={item.count} />
              {hoveredItemId === item.id && (
                <button
                  className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove item"
                >
                  <XMarkIcon className="size-4 text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
