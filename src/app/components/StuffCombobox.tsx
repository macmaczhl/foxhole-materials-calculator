"use client";

import { Fragment, useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { stuffList, Liquids, Materials, RawResources, Vehicles } from "@/lib/models";
import Image from 'next/image';

// Icon mapping for mini icons in dropdown (reused from StuffIcon.tsx)
const ICONS_MAP = new Map<string, string>([
  [Materials.ConstructionMaterials, 'icons/ConstructionMaterialsIcon.svg'],
  [Materials.ProcessedConstructionMaterials, 'icons/ProcessedConstructionMaterialsIcon.svg'],
  [Materials.RefinedMaterials, 'icons/RefinedMaterialsIcon.svg'],
  [Materials.BarbedWire, 'icons/BarbedWireMaterialItemIcon.svg'],
  [Materials.MetalBeam, 'icons/MetalBeamMaterialItemIcon.svg'],
  [Materials.Sandbag, 'icons/SandbagMaterialItemIcon.svg'],
  [Materials.AssemblyMaterialsI, 'icons/AssemblyMaterials1Icon.svg'],
  [Materials.AssemblyMaterialsII, 'icons/AssemblyMaterials2Icon.svg'],
  [Materials.AssemblyMaterialsIII, 'icons/AssemblyMaterials3Icon.svg'],
  [Materials.AssemblyMaterialsIV, 'icons/AssemblyMaterials4Icon.svg'],
  [Materials.AssemblyMaterialsV, 'icons/AssemblyMaterials5Icon.svg'],
  [Materials.SteelConstructionMaterials, 'icons/SteelConstructionMaterialsIcon.svg'],
  [Materials.ConcreteMaterials, 'icons/ConcreteBagIcon.svg'],
  [Materials.Pipe, 'icons/PipeIcon.svg'],
  [Materials.RareAlloys, 'icons/RareAlloyIcon.svg'],
  [Materials.ThermalShielding, 'icons/ThermalShieldingIcon.svg'],
  [Materials.UnstableSubstances, 'icons/UnstableSubstancesIcon.svg'],
  [Materials.FlameAmmo, 'icons/FlameAmmoIcon.svg'],

  [Liquids.Petrol, 'icons/RefinedFuelIcon.svg'],
  [Liquids.HeavyOil, 'icons/HeavyOilIcon.svg'],
  [Liquids.Water, 'icons/WaterIcon.svg'],
  [Liquids.EnrichedOil, 'icons/EnrichedOilIcon.svg'],
  [Liquids.Oil, 'icons/OilIcon.svg'],

  [RawResources.Salvage, 'icons/SalvageIcon.svg'],
  [RawResources.Components, 'icons/ComponentsIcon.svg'],
  [RawResources.Coke, 'icons/CokeIcon.svg'],
  [RawResources.DamagedComponents, 'icons/ComponentsDamagedIcon.svg'],
  [RawResources.Coal, 'icons/CoalIcon.svg'],
  [RawResources.Sulfur, 'icons/SulfurIcon.svg'],
  [RawResources.RareMetal, 'icons/RareMaterialsIcon.svg'],
  [RawResources.HeavyExplosivePowder, 'icons/HeavyExplosiveMaterialsIcon.svg'],

  [Vehicles.Xiphos, 'icons/ArmoredCarVehicleIcon.svg'],
]);

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
                  <MiniIcon stuffName={name} />
                  <span className="flex-1">{name}</span>
                  {selected && (
                    <CheckIcon className="ml-2 size-4 text-accent-300 flex-shrink-0" />
                  )}
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Transition>
    </Combobox>
  );
}
