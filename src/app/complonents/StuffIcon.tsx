import { Liquids, Materials, RawResources } from "@/lib/models";
import Image from 'next/image'

interface StuffIcon {
    stuffName: string
    count: number
}

const ICONS_MAP = new Map<string, string>([
    [Materials.ConstructionMaterials, 'images/f/f0/ConstructionMaterialsIcon.png'],
    [Materials.ProcessedConstructionMaterials, 'images/f/fa/ProcessedConstructionMaterialsIcon.png'],
    [Materials.BarbedWire, 'images/9/9b/BarbedWireMaterialItemIcon.png'],
    [Materials.MetalBeam, 'images/1/15/MetalBeamMaterialItemIcon.png'],
    [Materials.Sandbag, 'images/f/fe/SandbagMaterialItemIcon.png'],

    [Liquids.Petrol, 'images/thumb/f/f1/RefinedFuelIcon.png/100px-RefinedFuelIcon.png'],
    [Liquids.HeavyOil, 'images/f/f3/FacilityOil1Icon.png'],

    [RawResources.Salvage, 'images/3/33/SalvageIcon.png'],
    [RawResources.Components, 'images/thumb/a/ac/ComponentsIcon.png/100px-ComponentsIcon.png'],
    [RawResources.Coke, 'images/d/d8/CokeIcon.png'],
]);

export function StuffIcon({ stuffName, count }: StuffIcon) {
    const iconPostfix = ICONS_MAP.get(stuffName);

    return <div className="bg-neutral-500 min-w-16 relative">
        {iconPostfix ? <Image
            alt={stuffName}
            src={`https://foxhole.wiki.gg/${iconPostfix}`}
            decoding="async" loading="lazy" width="60" height="60" data-file-width="60" data-file-height="60" /> : `${stuffName}(${count})`}
        <span className="absolute bottom-0 right-0 bg-cyan-50 px-1 text-sm">{count}</span>
    </div>;
}
