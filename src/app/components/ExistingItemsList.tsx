"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectExistingItems,
  removeExistingItem,
} from "@/lib/features/existingSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { StuffIcon } from "./StuffIcon";

export function ExistingItemsList() {
  const existingItems = useAppSelector(selectExistingItems);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeExistingItem(itemId));
  };

  if (existingItems.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-400">
        <p>No existing items added yet.</p>
        <p>Click &ldquo;Add&rdquo; to add items you already have.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {existingItems.map((item) => (
        <div key={item.id} className="group relative">
          <StuffIcon stuffName={item.stuffName} count={item.count} />
          <button
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
            onClick={() => handleRemoveItem(item.id)}
            title="Remove item"
          >
            <XMarkIcon className="size-4 text-white" />
          </button>
        </div>
      ))}
    </div>
  );
}
