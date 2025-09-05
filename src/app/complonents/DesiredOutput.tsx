"use client";

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addRow, changeCount, changeStuff, deleteRow, selectRows } from '@/lib/features/desiredSlice';
import StuffCombobox from './StuffCombobox';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';

export function DesiredOutput() {
    const rows = useAppSelector(selectRows);
    const dispatch = useAppDispatch();

    const canDelete = rows.length > 1;

    return (
      <div className="panel m-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">Desired items</h2>
          <button
            className="btn-primary inline-flex items-center"
            onClick={() => dispatch(addRow())}
          >
            <PlusIcon className="size-4 mr-1" /> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full ui-table">
            <thead>
              <tr>
                <th className="w-28 text-left">Count</th>
                <th className="text-left">Desired stuff</th>
                <th className="w-20 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="number"
                      min={0}
                      value={row.count}
                      onChange={(e) => dispatch(changeCount({ rowId: row.id, value: e.target.value }))}
                      className="ui-input w-24"
                    />
                  </td>
                  <td>
                    <StuffCombobox
                      value={row.stuffName}
                      onChange={(v) => dispatch(changeStuff({ rowId: row.id, value: v }))}
                      placeholder="Search materials/vehicles"
                    />
                  </td>
                  <td className="text-center">
                    <button
                      title={canDelete ? "Delete row" : "Cannot delete the only row"}
                      className={`btn-danger inline-flex items-center justify-center ${!canDelete ? 'btn-disabled' : ''}`}
                      onClick={() => canDelete && dispatch(deleteRow(row.id))}
                      disabled={!canDelete}
                    >
                      <XMarkIcon className="size-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}