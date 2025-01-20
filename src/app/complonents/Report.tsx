import { useAppSelector } from "@/lib/hooks";
import { StuffIcon } from "./StuffIcon";

export function Report() {
    const initialComponents = useAppSelector(state => state.desiredStuff.initialComponents);
    const calculatedComponents = useAppSelector(state => state.desiredStuff.calculatedComponents);

    return <div className="p-2 m-6 bg-neutral-400 flex flex-col">
        <div>
            Initial components
            <div className="flex flex-row space-x-1">
                {initialComponents.map(e => (
                    <div key={e.stuff}>
                        <StuffIcon stuffName={e.stuff} count={e.count} />
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-3">
            Calculated components
            <div className="flex flex-row space-x-1">
                {calculatedComponents.map(e => (
                    <div key={e.stuff}>
                        <StuffIcon stuffName={e.stuff} count={e.count} />
                    </div>
                ))}
            </div>
        </div>
    </div>;
}
