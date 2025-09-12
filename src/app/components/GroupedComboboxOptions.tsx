"use client";

import { ComboboxOption } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { GroupedStuff } from "@/lib/models";
import { ICONS_MAP } from "@/lib/constants";
import Image from 'next/image';

// Mini icon component for dropdown items
function MiniIcon({ stuffName }: { stuffName: string }) {
  const iconPath = ICONS_MAP.get(stuffName);

  if (!iconPath) {
    return <div className="w-4 h-4 mr-2 flex-shrink-0" />; // Placeholder for items without icons
  }

  return (
    <Image
      alt={stuffName}
      src={`/${iconPath}`}
      width={16}
      height={16}
      className="w-4 h-4 mr-2 flex-shrink-0"
      decoding="async"
      loading="lazy"
    />
  );
}

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
            <ComboboxOption
              key={item.name}
              value={item.name}
              className="dropdown-option"
            >
              {({ selected }) => (
                <div className="flex items-center">
                  <MiniIcon stuffName={item.name} />
                  <span className="flex-1">{item.name}</span>
                  {selected && (
                    <CheckIcon className="ml-2 size-4 text-accent-300 flex-shrink-0" />
                  )}
                </div>
              )}
            </ComboboxOption>
          ))}
        </div>
      ))}
    </>
  );
}
