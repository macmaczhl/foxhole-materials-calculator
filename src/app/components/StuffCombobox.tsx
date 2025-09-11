"use client";

import { Fragment, useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { groupedStuffList } from "@/lib/models";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function StuffCombobox({ value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!query) return groupedStuffList;

    const q = query.toLowerCase();
    return groupedStuffList
      .map(group => ({
        ...group,
        items: group.items.filter(item => item.name.toLowerCase().includes(q))
      }))
      .filter(group => group.items.length > 0);
  }, [query]);

  // Flatten for compatibility with existing onChange logic
  const allFilteredItems = useMemo(() => {
    return filteredGroups.flatMap(group => group.items.map(item => item.name));
  }, [filteredGroups]);

  return (
    <Combobox value={value} onChange={onChange} immediate>
      <div className="relative">
        <ComboboxInput
          className="ui-input pr-9 w-full"
          placeholder={placeholder ?? "Select material or vehicle"}
          displayValue={(v: string) => v}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2 text-accent-300 hover:text-accent-200">
          <ChevronUpDownIcon className="size-5" />
        </ComboboxButton>
      </div>

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <ComboboxOptions anchor="bottom start" className="dropdown-panel">
          {allFilteredItems.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-400">No results</div>
          )}

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
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
}
