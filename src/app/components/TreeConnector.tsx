import React from "react";

interface TreeConnectorProps {
  depth: number;
  isLast: boolean;
  hasSiblings: boolean;
  isFirst: boolean;
}

export function TreeConnector({
  depth,
  isLast,
}: TreeConnectorProps) {
  if (depth === 0) return null;

  const indentSize = 16;
  const connectorWidth = 12;
  const lineThickness = 2;

  // Calculate positions for inner directories tree style
  const verticalLineX = (depth - 1) * indentSize + 8;
  const horizontalLineX = verticalLineX;
  const horizontalLineY = 24; // Half of typical panel height
  const horizontalLineWidth = connectorWidth;

  // Vertical line height - extends down if not last, or just to center if last
  const verticalLineHeight = isLast ? horizontalLineY : 1000; // Large number to extend beyond container

  return (
    <div className="absolute left-0 top-0 w-full h-full pointer-events-none tree-connector">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        style={{ overflow: 'visible' }}
        width="100%"
        height="100%"
      >
        {/* Main vertical line from parent - only if not last */}
        {!isLast && (
          <line
            x1={verticalLineX}
            y1={0}
            x2={verticalLineX}
            y2={verticalLineHeight}
            stroke="var(--border-600)"
            strokeWidth={lineThickness}
            opacity={0.6}
          />
        )}

        {/* L-shaped connector: vertical + horizontal */}
        <path
          d={`M ${verticalLineX} 0 L ${verticalLineX} ${horizontalLineY} L ${horizontalLineX + horizontalLineWidth} ${horizontalLineY}`}
          stroke="var(--border-600)"
          strokeWidth={lineThickness}
          fill="none"
          opacity={0.8}
        />
      </svg>
    </div>
  );
}
