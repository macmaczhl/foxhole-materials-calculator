# Foxhole Materials Calculator
Foxhole Materials Calculator is a Next.js TypeScript web application that calculates required materials and crafting recipes for the Foxhole game. It uses React with Redux Toolkit for state management, Tailwind CSS for styling, and is deployed to GitHub Pages.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Development Commands
- Install dependencies: `npm install` (takes ~30 seconds, timeout 60+ seconds)
- Start development server: `npm run dev` (ready in ~2 seconds)
- Run tests: `npm test` (executes Jest test suite)
- Lint code: `npm run lint` (ESLint with Next.js rules)
- Build for production: `npm run build` (takes ~30 seconds, timeout 120+ seconds)


## Testing Requirements

### Unit Test Coverage
All new and changed code **MUST** be covered by unit tests:
- **REQUIRED**: Write unit tests for any new functions, components, or logic
- **REQUIRED**: Update existing tests when modifying existing code
- **REQUIRED**: Achieve 100% test coverage for new/changed code
- Run `npm test` to execute all tests
- Use `npm run test:watch` for continuous testing during development

### Test Structure
- Place test files in `src/__tests__/` directory
- Use `.test.ts` or `.test.tsx` extensions
- Follow existing test patterns (see `calculateComponents.test.ts`)
- Mock external dependencies and API calls
- Test both success and error scenarios

**Important**: Never cancel build or install commands. Wait for completion even if it takes the full timeout period.

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
- **Workflow**: `.github/workflows/nextjs.yml` handles build and deployment
- Uses static site generation with `next build` and exports to `./out/`

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