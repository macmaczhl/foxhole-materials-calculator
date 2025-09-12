"use client";

import { ComboboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { GroupedStuff } from "@/lib/models";

interface Props {
  filteredGroups: GroupedStuff[];
}

export default function GroupedComboboxOptions({ filteredGroups }: Props) {
  return (
    <>
      {filteredGroups.map((group) => (
        <div key={group.group}>
          {/* Group header */}
          <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-300 bg-panel-400 border-b border-border-600">
            {group.group}
          </div>

          {/* Group items */}
          {group.items.map((item) => (
            <ComboboxOption key={item.name} value={item.name} className="dropdown-option">
              {({ selected }) => (
                <div className="flex items-center">
                  {selected ? (
                    <CheckIcon className="mr-2 size-4 text-accent-300" />
                  ) : (
                    <span className="mr-2 size-4" />
                  )}
                  <span>{item.name}</span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </div>
      ))}
    </>
  );
}
