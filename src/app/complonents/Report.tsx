import { useAppSelector } from "@/lib/hooks";
import { StuffIcon } from "./StuffIcon";

export function Report() {
    const initialComponents = useAppSelector(state => state.desiredStuff.initialComponents);

    return <div className="p-2 m-6 bg-neutral-400 flex flex-col">
        <div>
            Initial requirements
            {initialComponents.map(e => (
                <div>
                    <StuffIcon stuffName={e.stuff} count={e.count} />
                </div>
            ))}
        </div>
    </div>;
}