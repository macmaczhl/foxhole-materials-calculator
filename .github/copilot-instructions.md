# Foxhole Materials Calculator

Next.js TypeScript app for calculating Foxhole game materials and crafting recipes. Uses React + Redux Toolkit + Tailwind CSS.

## Essential Commands

```bash
npm install     # 30s - install dependencies
npm run dev     # 1s - start dev server
npm test        # 4s - run tests
npm run lint    # 2s - check code style
npm run build   # 30s - production build (NEVER CANCEL)
```

## Critical Requirements

- **All new/changed code MUST have unit tests** (100% coverage)
- **Tests, lint, and build must pass** before task completion
- **NEVER CANCEL** long-running commands (builds take 30+ seconds)
- **Fix git conflicts** before finishing tasks

## Key Files

- `src/lib/models.ts` - Material definitions and types
- `src/lib/recipes.ts` - All crafting recipes
- `src/lib/services/calculateComponents.ts` - Core calculation logic
- `src/lib/features/desiredStuffSlice.ts` - Redux state management
- `src/app/components/` - React UI components
- `src/__tests__/` - Unit tests directory

## Project Structure

```
src/
├── app/
│   ├── components/     # React UI components
│   ├── page.tsx        # Main app page
│   └── layout.tsx      # App layout
├── lib/
│   ├── models.ts       # Material definitions
│   ├── recipes.ts      # Crafting recipes
│   ├── services/       # Business logic
│   ├── features/       # Redux slices
│   └── store.ts        # Redux store
└── __tests__/          # Unit tests
```

## Material Categories

- **Raw Resources**: Salvage, Components, Coal, Sulfur, Rare Metal
- **Materials**: Construction Materials, Metal Beam, Sandbag
- **Liquids**: Petrol, Heavy Oil, Water, Enriched Oil
- **Assembly Materials**: Assembly Materials I-V

## Testing Workflow

1. Write unit tests for new/changed code
2. Run `npm test` (must pass)
3. Run `npm run lint` (must pass)
4. Run `npm run build` (must complete successfully)
5. Manual test: Select "Construction Materials", set quantity to 5, verify 50 Salvage result

## Common Tasks

### Adding New Materials
1. Add to enum in `src/lib/models.ts`
2. Add to `availableMaterials` array
3. Create recipes in `src/lib/recipes.ts`
4. Update `RecipiesByStuff` map
5. **Write unit tests**

### Modifying Calculations
- Edit `src/lib/services/calculateComponents.ts`
- Edit `src/lib/features/desiredStuffSlice.ts` for recipe trees
- **Write unit tests**

## Deployment
- Auto-deploys to GitHub Pages on main branch
- Live site: https://macmaczhl.github.io/foxhole-materials-calculator/
- Uses static site generation with `next build`

## Troubleshooting
- **Build fails**: Check TypeScript errors, run `npm install`
- **Icons not loading**: Check foxhole.wiki.gg connectivity
- **State issues**: Verify Redux actions in components
