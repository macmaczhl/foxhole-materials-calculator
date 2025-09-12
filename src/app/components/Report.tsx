import { useAppSelector } from "@/lib/hooks";
import { selectAdjustedReport } from "@/lib/selectors";
import { StuffIcon } from "./StuffIcon";

export function Report() {
  const { initial, raw, excess, excessResult } = useAppSelector(selectAdjustedReport);

  // Check if there are any results to show
  const hasResults = initial.length > 0 || raw.length > 0 || excess.length > 0;

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
            {initial.map(e => (
              <div key={e.stuff}>
                <StuffIcon stuffName={e.stuff} count={e.count} />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <div className="section-title">Calculated components</div>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            {raw.map(e => (
              <div key={e.stuff}>
                <StuffIcon stuffName={e.stuff} count={e.count} />
              </div>
            ))}
          </div>
        </div>
        {excess.length > 0 && (
          <div className="mb-3">
            <div className="section-title">Excess components</div>
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              {excess.map(e => (
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
