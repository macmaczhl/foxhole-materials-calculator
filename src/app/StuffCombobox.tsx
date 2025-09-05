"use client";

import { Fragment, useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { stuffList } from "@/lib/models";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function StuffCombobox({ value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    if (!query) return stuffList.map(s => s.name);
    const q = query.toLowerCase();
    return stuffList.map(s => s.name).filter(n => n.toLowerCase().includes(q));
  }, [query]);

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
          {options.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-400">No results</div>
          )}

          {options.map((name) => (
            <ComboboxOption key={name} value={name} className="dropdown-option">
              {({ selected }) => (
                <div className="flex items-center">
                  {selected ? (
                    <CheckIcon className="mr-2 size-4 text-accent-300" />
                  ) : (
                    <span className="mr-2 size-4" />
                  )}
                  <span>{name}</span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
}