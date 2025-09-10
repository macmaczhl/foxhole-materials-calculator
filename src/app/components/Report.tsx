import { useAppSelector } from "@/lib/hooks";
import { StuffIcon } from "./StuffIcon";

export function Report() {
  const initialComponents = useAppSelector(state => state.desiredStuff.initialComponents);
  const rawComponents = useAppSelector(state => state.desiredStuff.rawComponents);
  const excessComponents = useAppSelector(state => state.desiredStuff.excessComponents);
  const excessResult = useAppSelector(state => state.desiredStuff.excessResult);

  return <div className="p-2 m-6 bg-neutral-400 flex flex-col">
    <div className="mb-3">
            Initial components
      <div className="flex flex-row space-x-1">
        {initialComponents.map(e => (
          <div key={e.stuff}>
            <StuffIcon stuffName={e.stuff} count={e.count} />
          </div>
        ))}
      </div>
    </div>
    <div className="mb-3">
            Calculated components
      <div className="flex flex-row space-x-1">
        {rawComponents.map(e => (
          <div key={e.stuff}>
            <StuffIcon stuffName={e.stuff} count={e.count} />
          </div>
        ))}
      </div>
    </div>
    <div className="mb-3">
            Excess components
      <div className="flex flex-row space-x-1">
        {excessComponents.map(e => (
          <div key={e.stuff}>
            <StuffIcon stuffName={e.stuff} count={e.count} />
          </div>
        ))}
      </div>
    </div>
    {excessResult.length > 0 && (
      <div className="mb-3">
              Excess result
        <div className="flex flex-row space-x-1">
          {excessResult.map(e => (
            <div key={e.stuff}>
              <StuffIcon stuffName={e.stuff} count={e.count} />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>;
}
