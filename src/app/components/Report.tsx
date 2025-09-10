import { useAppSelector } from "@/lib/hooks";
import { selectAdjustedReport } from "@/lib/selectors";
import { StuffIcon } from "./StuffIcon";

export function Report() {
  const { initial, raw, excess, excessResult } = useAppSelector(selectAdjustedReport);

  return <div className="panel m-6 flex flex-col">
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
