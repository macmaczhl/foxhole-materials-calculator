"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AddItemForm } from "./AddItemForm";
import { ExistingItemsList } from "./ExistingItemsList";

export function ExistingItems() {
  const [showAddForm, setShowAddForm] = useState(false);

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

      {showAddForm && <AddItemForm onClose={() => setShowAddForm(false)} />}

      <ExistingItemsList />
    </div>
  );
}
