import { useAppSelector } from "@/lib/hooks";
import { StuffIcon } from "./StuffIcon";

export function Report() {
    const initialComponents = useAppSelector(state => state.desired.initialComponents);
    const rawComponents = useAppSelector(state => state.desired.rawComponents);
    const excessComponents = useAppSelector(state => state.desired.excessComponents);

    return <div className="panel m-6 flex flex-col">
        <div className="mb-3">
            <div className="section-title">Initial components</div>
            <div className="flex flex-row flex-wrap gap-2 mt-2">
                {initialComponents.map(e => (
                    <div key={e.stuff}>
                        <StuffIcon stuffName={e.stuff} count={e.count} />
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-3">
            <div className="section-title">Calculated components</div>
            <div className="flex flex-row flex-wrap gap-2 mt-2">
                {rawComponents.map(e => (
                    <div key={e.stuff}>
                        <StuffIcon stuffName={e.stuff} count={e.count} />
                    </div>
                ))}
            </div>
        </div>
        <div className="mb-3">
            <div className="section-title">Excess components</div>
            <div className="flex flex-row flex-wrap gap-2 mt-2">
                {excessComponents.map(e => (
                    <div key={e.stuff}>
                        <StuffIcon stuffName={e.stuff} count={e.count} />
                    </div>
                ))}
            </div>
        </div>
    </div>;
}