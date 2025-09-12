# Foxhole Materials Calculator

Foxhole Materials Calculator is a Next.js TypeScript web application that calculates required materials and crafting recipes for the Foxhole game. It uses React with Redux Toolkit for state management, Tailwind CSS for styling, and is deployed to GitHub Pages.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

When making changes be ensure that there are no conflicts with target branch.

Before task is finished:

1. There shouldn't be conflicts with target branch.
2. Tests, linter and format commands always should pass!

Always update the branch and fix conflicts when you apply new changes and conflicts exist. There should be no git conflicts before task finished.

## Working Effectively

### Development Commands

- Install dependencies: `npm install` (takes ~30 seconds, timeout 120+ seconds)
- Start development server: `npm run dev` (ready in ~1 second)
- Run tests: `npm test` (executes Jest test suite, takes ~4 seconds)
- Lint code: `npm run lint` and `npm run format:check` (ESLint with Next.js rules, takes ~2 seconds)
- Build for production: `npm run build` (takes ~30 seconds, timeout 180+ seconds - NEVER CANCEL)
- Continuous testing: `npm run test:watch` (Jest watch mode for development)

## Validation and Manual Testing

### Required Validation Steps

Always run these validation steps after making changes:

1. **NEVER CANCEL long-running commands** - builds may take up to 30+ seconds
2. **Build validation**: `npm run build` - must complete successfully (timeout 180+ seconds)
3. **Test validation**: `npm test` - all tests must pass (~4 seconds)
4. **Lint validation**: `npm run lint` - must pass without errors (~2 seconds)
5. **Manual functionality testing**: Start dev server and verify core workflows

### Manual Testing Scenarios

After making changes, ALWAYS test these complete user scenarios:

1. **Basic material calculation**:
   - Select "Construction Materials"
   - Set quantity to 5
   - Verify result shows 50 Salvage in both Initial and Calculated components
2. **Complex recipe calculation**:
   - Select "T3 Xiphos" vehicle
   - Set quantity to 5
   - Verify shows 125 Refined Materials → 11,250 Salvage + 10,000 Components
3. **Recipe selection**:
   - Verify multiple recipe options appear in right panel
   - Test switching between different recipe options
4. **UI responsiveness**: Verify layout works and icons load from foxhole.wiki.gg

## Testing Requirements

### Critical Build Information

- **NEVER CANCEL** any build or test commands - they must complete fully
- **npm run build**: Takes ~30 seconds, set timeout to 180+ seconds minimum
- **npm install**: Takes ~30 seconds, set timeout to 120+ seconds minimum
- **npm test**: Takes ~4 seconds, all 12 tests across 2 suites must pass

### Unit Test Coverage

All new and changed code **MUST** be covered by unit tests:

- **REQUIRED**: Write unit tests for any new functions, components, or logic
- **REQUIRED**: Achieve 100% test coverage for new/changed code
- Run `npm test` to execute all tests
- Use `npm run test:watch` for continuous testing during development

### Test Structure

- Place test files in `src/__tests__/` directory
- Use `.test.ts` or `.test.tsx` extensions
- Follow existing test patterns (see `calculateComponents.test.ts`)
- Mock external dependencies and API calls
- Test both success and error scenarios

## Repository Structure

### Key Directories

- `src/app/` - Next.js app directory with main page and components
  - `src/app/components/` - Contains React components used in the main app

  - `src/app/page.tsx` - Main application page with Redux provider
  - `src/app/layout.tsx` - Layout with Google Fonts configuration

- `src/lib/` - Core application logic and state management
  - `src/lib/store.ts` - Redux store configuration
  - `src/lib/models.ts` - Material definitions, enums, and types
  - `src/lib/recipes.ts` - All crafting recipes and recipe combinations
  - `src/lib/features/desiredStuffSlice.ts` - Redux slice for calculator state
  - `src/lib/services/calculateComponents.ts` - Core calculation algorithms

### Available Materials

The application supports these material categories (from `src/lib/models.ts`):

- **Raw Resources**: Salvage, Components, Coal, Sulfur, Rare Metal, etc.
- **Materials**: Construction Materials, Processed Construction Materials, Metal Beam, Sandbag, etc.
- **Liquids**: Petrol, Heavy Oil, Water, Enriched Oil, Oil
- **Assembly Materials**: Assembly Materials I through V

### Component Architecture

- React with Redux Toolkit for state management
- Headless UI for accessible components
- Tailwind CSS for styling with responsive design
- TypeScript for type safety throughout

## Common Development Tasks

### Adding New Materials

1. Add to appropriate enum in `src/lib/models.ts`
2. Add to `availableMaterials` array in same file
3. Create recipes in `src/lib/recipes.ts`
4. Update `RecipiesByStuff` map to include new material
5. **REQUIRED**: Add unit tests for new material and recipes

### Modifying Calculations

- Core calculation logic is in `src/lib/services/calculateComponents.ts`
- Recipe tree building logic is in `src/lib/features/desiredStuffSlice.ts`
- **REQUIRED**: Add unit tests for any calculation changes

### UI Components

- Main components are in `src/app/components/`
- `StuffIcon.tsx` handles material icons from foxhole.wiki.gg
- `RecipesSelector.tsx` and `RecipesSelectors.tsx` handle recipe selection UI
- Components use Tailwind classes and are responsive

## Deployment

- **Automatic deployment**: GitHub Actions deploys to GitHub Pages on main branch pushes
- **Live site**: https://macmaczhl.github.io/foxhole-materials-calculator/
- **Workflows**:
  - `.github/workflows/lint-and-test.yml` - Runs on all PRs and main branch pushes
  - `.github/workflows/deployment.yml` - Deploys to GitHub Pages after successful lint/test
- Uses static site generation with `next build` and exports to `./out/`
- **Build time**: ~30 seconds (set 180+ second timeout, NEVER CANCEL)

## Development Guidelines

- **Always run linting**: `npm run lint` before committing changes
- **Always run tests**: `npm test` to ensure all tests pass
- **Unit test coverage**: Write tests for all new/changed code
- **Maintain TypeScript**: Keep strict type checking enabled
- **Responsive design**: Ensure UI works on different screen sizes
- **Icon integration**: Material icons come from foxhole.wiki.gg - verify they load correctly

## Troubleshooting

- **Build fails**: Check TypeScript errors and ensure dependencies are installed with `npm install`
- **Dev server issues**: Stop with Ctrl+C and restart with `npm run dev`
- **TypeScript errors**: Check imports and type definitions in `src/lib/models.ts`
- **State not updating**: Verify Redux actions are dispatched in components
- **Icons not loading**: Check network connectivity to foxhole.wiki.gg

### Emergency Recovery

If builds consistently fail:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` (wait full 120+ seconds, NEVER CANCEL)
3. Run `npm run build` (wait full 180+ seconds, NEVER CANCEL)
4. Manually test application functionality as described above

## Quick Reference for Agents

### Most Frequently Used Commands

```bash
# Standard development workflow (run in order):
npm install        # 30s - install dependencies
npm run lint       # 2s - check code style
npm test          # 4s - run test suite
npm run build     # 30s - production build (NEVER CANCEL)
npm run dev       # 1s - start dev server
```

### Critical Files to Know

- `src/lib/models.ts` - Material definitions and types
- `src/lib/recipes.ts` - All crafting recipes
- `src/lib/services/calculateComponents.ts` - Core calculation logic
- `src/lib/features/desiredStuffSlice.ts` - Redux state management
- `src/app/components/` - React UI components
- `eslint.config.mjs` - Linting configuration (indent rule disabled)

### Expected Application Behavior

- Material dropdown shows 26 items (raw resources, materials, liquids, vehicles)
- Calculation is real-time as you type quantities
- Recipe tree builds automatically based on selected recipes
- Icons load from foxhole.wiki.gg external API
- Results show both "Initial components" and "Calculated components"
