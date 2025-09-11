import { useAppSelector } from "@/lib/hooks";
import { StuffIcon } from "./StuffIcon";

export function Report() {
  const initialComponents = useAppSelector(state => state.desired.initialComponents);
  const rawComponents = useAppSelector(state => state.desired.rawComponents);
  const excessComponents = useAppSelector(state => state.desired.excessComponents);
  const excessResult = useAppSelector(state => state.desired.excessResult);

  // Check if there are any results to show
  const hasResults = initialComponents.length > 0 || rawComponents.length > 0 || excessComponents.length > 0;

  return <div className="panel m-6 flex flex-col">
    {!hasResults ? (
      <div className="text-center text-gray-400 py-8">
        <p className="text-lg">Choose items and set quantities to see the material requirements</p>
      </div>
    ) : (
      <>
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
        {excessComponents.length > 0 && (
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
        )}
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
      </>
    )}
  </div>;
}
