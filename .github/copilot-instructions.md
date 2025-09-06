# Foxhole Materials Calculator
Foxhole Materials Calculator is a Next.js TypeScript web application that calculates required materials and crafting recipes for the Foxhole game. It uses React with Redux Toolkit for state management, Tailwind CSS for styling, and is deployed to GitHub Pages.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Development
- Install dependencies: `npm install` -- takes 30 seconds. Set timeout to 60+ seconds.
- Start development server: `npm run dev` -- ready in 2 seconds, runs on http://localhost:3000
- Lint code: `npm run lint` -- takes 5 seconds, runs ESLint with Next.js rules
- Build for production: `npm run build` -- takes 30 seconds. Set timeout to 120+ seconds.


## Validation Scenarios

### Always Test Calculator Functionality
After making changes, **ALWAYS** validate the core application works:
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Enter count: `5` in the Count field
4. Select material: `Construction Materials` from dropdown
5. Verify initial components show: `50 Salvage`
6. Verify calculated components appear
7. Verify recipe tree shows different crafting options with radio buttons
8. Take screenshot to confirm UI displays correctly

### Manual Validation Steps
- **REQUIRED**: After any code changes, run the calculator validation scenario above
- Test with different materials from the available list (see Repository Structure below)
- Verify Redux state updates work by changing count and material selections
- Ensure recipe trees display with visual icons and proper component counts

## Command Timing and Expectations

| Command | Expected Time | Timeout Setting | Notes |
|---------|---------------|-----------------|--------|
| `npm install` | 30 seconds | 60+ seconds | Downloads ~400 packages |
| `npm run dev` | 2 seconds | 30 seconds | Starts Turbopack dev server |
| `npm run lint` | 5 seconds | 30 seconds | ESLint validation, usually no errors |
| `npm run build` | 30 seconds | 120+ seconds | Production build with static generation |

**NEVER CANCEL** any build or install commands. Wait for completion even if it takes the full timeout period.

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

### Modifying Calculations
- Core calculation logic is in `src/lib/services/calculateComponents.ts`
- Recipe tree building logic is in `src/lib/features/desiredStuffSlice.ts`
- Always test calculations with the validation scenario after changes

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
- **Maintain TypeScript**: Keep strict type checking enabled
- **Test calculator**: Always validate core functionality after changes using the validation scenario
- **Responsive design**: Ensure UI works on different screen sizes
- **Icon integration**: Material icons come from foxhole.wiki.gg - verify they load correctly

## Troubleshooting
- **Build fails**: Check TypeScript errors and ensure dependencies are installed with `npm install`
- **Dev server issues**: Stop with Ctrl+C and restart with `npm run dev`
- **TypeScript errors**: Check imports and type definitions in `src/lib/models.ts`
- **State not updating**: Verify Redux actions are dispatched in components
- **Icons not loading**: Check network connectivity to foxhole.wiki.gg