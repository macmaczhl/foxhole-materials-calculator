"use client";

import { Fragment, useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
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

  const handleClear = () => {
    setQuery("");
    onChange("");
  };

  const showClearButton = query.length > 0 || value.length > 0;

  return (
    <Combobox value={value} onChange={onChange} immediate>
      <div className="relative">
        <ComboboxInput
          className={`ui-input w-full ${showClearButton ? 'pr-16' : 'pr-9'}`}
          placeholder={placeholder ?? "Select material or vehicle"}
          displayValue={(v: string) => v}
          onChange={(e) => setQuery(e.target.value)}
        />
        {showClearButton && (
          <button
            type="button"
            className="absolute inset-y-0 right-9 flex items-center pr-1 text-muted-400 hover:text-muted-200 focus:outline-none focus:text-muted-200"
            onClick={handleClear}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClear();
              }
            }}
            aria-label="Clear search"
            tabIndex={0}
          >
            <XMarkIcon className="size-4" />
          </button>
        )}
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
