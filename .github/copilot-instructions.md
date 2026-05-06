# Foxhole Materials Calculator

Next.js TypeScript app for calculating Foxhole game materials and crafting recipes. Uses React + Redux Toolkit + Tailwind CSS.

## Essential Commands

```bash
npm install     # install dependencies
npm run dev     # start dev server
npm test        # run tests
npm run lint    # check code style
npm run build   # production build (NEVER CANCEL)
```

## Critical Requirements

- **All new/changed code MUST have unit tests** (100% coverage)
- **Tests, lint, and build must pass** before task completion
- **NEVER CANCEL** long-running commands (builds take 30+ seconds)
- **Fix git conflicts** before finishing tasks

## Updating an Existing Branch

Before starting work on an existing branch, pull and rebase onto `main`. Resolve all conflicts, then verify tests pass.

**Conflict resolution**: prefer newer dependency versions from main; keep our feature logic for overlapping code; preserve new files we added.

## Key Files

- `src/lib/models.ts` — Material/vehicle enums, types, grouping helpers
- `src/lib/recipes.ts` — Aggregates all recipe sub-modules
- `src/lib/recipes/` — Sub-recipe files: `rawResources`, `constructionMaterials`, `liquids`, `assemblyMaterials`, `vehicles`
- `src/lib/services/calculateComponents.ts` — Core calculation logic
- `src/lib/features/desiredStuffSlice.ts` — Redux state management
- `src/app/components/` — React UI components
- `src/__tests__/` — Unit tests

## Project Structure

```
src/
├── app/
│   ├── components/     # React UI components
│   ├── page.tsx
│   └── layout.tsx
├── lib/
│   ├── models.ts       # Enums: Materials, Liquids, Vehicles, RawResources
│   ├── recipes.ts      # Aggregates sub-recipe maps
│   ├── recipes/        # Per-category recipe files
│   ├── services/       # Business logic
│   ├── features/       # Redux slices
│   └── store.ts
└── __tests__/
```

## Material Categories (see `models.ts` for full list)

- **Raw Resources**: Salvage, Components, Coke, Coal, Sulfur, Rare Metal, Damaged Components, Heavy Explosive Powder
- **Materials**: Construction Materials, Processed Construction Materials, Refined Materials, Basic Materials, Barbed Wire, Metal Beam, Sandbag, Steel Construction Materials, Concrete Materials, Pipe, Rare Alloys, Thermal Shielding, Unstable Substances, Flame Ammo, Naval Hull Segments, Naval Shell Plating, Naval Turbine Components, Assembly Materials I–V
- **Liquids**: Petrol, Heavy Oil, Water, Enriched Oil, Oil
- **Vehicles**: Many — see `Vehicles` enum in `models.ts`

## Common Tasks

### Adding New Materials
1. Add to the appropriate enum in `src/lib/models.ts`
2. Add to `availableMaterials` array (and `getItemGroup` if needed)
3. Add recipes to the relevant file in `src/lib/recipes/`
4. Write unit tests

### Modifying Calculations
- Edit `src/lib/services/calculateComponents.ts`
- Edit `src/lib/features/desiredStuffSlice.ts` for recipe trees
- Write unit tests

## Testing Workflow

1. Write unit tests for all new/changed code
2. `npm test` — must pass
3. `npm run lint` — must pass
4. `npm run build` — must complete successfully

## Deployment

- Auto-deploys to GitHub Pages on `main` branch
- Live site: https://macmaczhl.github.io/foxhole-materials-calculator/
