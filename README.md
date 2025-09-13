# Foxhole Materials Calculator

A comprehensive web application for calculating material requirements and crafting recipes for the Foxhole game. Calculate the exact resources needed to produce any quantity of materials, vehicles, or equipment with intelligent recipe tree optimization.

🚀 **Live Application**: https://macmaczhl.github.io/foxhole-materials-calculator/

Inspired by [reddit post](https://www.reddit.com/r/foxholegame/comments/ym64ru/facility_cost_calculator/)

## Features

### 🏭 Comprehensive Material Support
- **26 different materials** across multiple categories:
  - **Vehicles**: T3 "Xiphos" armored car with multiple production recipes
  - **Components**: Construction Materials, Refined Materials, Assembly Materials I-V, and more
  - **Liquids**: Petrol, Heavy Oil, Water, Enriched Oil, Oil
  - **Raw Resources**: Salvage, Components, Coal, Sulfur, Rare Metal, etc.

### 🔧 Advanced Recipe Tree System
- **Smart recipe selection**: Choose between garage production vs mass production factory recipes
- **Deep dependency tracking**: Automatically calculates all required sub-materials
- **Multiple recipe options**: Different production methods with varying efficiency
- **Real-time calculations**: Instant updates as you modify quantities

### 📊 Intelligent Calculations
- **Initial Components**: Direct material requirements for selected recipes
- **Calculated Components**: Raw materials needed after breaking down all dependencies
- **Excess tracking**: Shows surplus materials when using crate-based production
- **Scalable quantities**: Calculate for any number of items with precise scaling

### 🎯 User-Friendly Interface
- **Categorized material selection**: Organized by Vehicle, Components, and Raw Resources
- **Visual recipe display**: Icons and quantities for easy understanding
- **Recipe tree visualization**: See the complete production chain
- **Responsive design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites
- Node.js 20.x or later
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/macmaczhl/foxhole-materials-calculator.git
cd foxhole-materials-calculator

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
# Create production build
npm run build

# Start production server (optional)
npm start
```

## Usage Examples

### Basic Material Calculation
1. Select "Construction Materials" from the dropdown
2. Set quantity to 5
3. View results: 50 Salvage required

### Vehicle Production Planning
1. Select "T3 Xiphos" vehicle
2. Set quantity to 5
3. Choose between production methods:
   - **Garage**: 5 × 25 = 125 Refined Materials
   - **Mass Production**: 179 Refined Materials → 9 vehicles (4 excess)
4. View complete material breakdown: 11,250 Salvage + 10,000 Components

### Recipe Tree Optimization
- Explore different recipe options in the right panel
- Compare efficiency between production methods
- Optimize for available materials vs production speed

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **State Management**: Redux Toolkit for complex state
- **Styling**: Tailwind CSS with responsive design
- **UI Components**: Headless UI for accessibility
- **Testing**: Jest with React Testing Library
- **Deployment**: GitHub Pages with static export

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── components/              # React components
│   │   ├── ItemsManager.tsx     # Material selection interface
│   │   ├── RecipesSelectors.tsx # Recipe tree display
│   │   ├── Report.tsx           # Calculation results
│   │   └── StuffCombobox.tsx    # Material search dropdown
│   ├── page.tsx                 # Main application page
│   └── layout.tsx               # App layout and fonts
├── lib/                         # Core application logic
│   ├── features/               # Redux slices
│   │   ├── desiredSlice.ts     # Main calculator state
│   │   └── existingSlice.ts    # Existing materials tracking
│   ├── services/               # Business logic
│   │   └── calculateComponents.ts # Recipe calculation engine
│   ├── models.ts               # Type definitions and enums
│   ├── recipes.ts              # All crafting recipes
│   └── store.ts                # Redux store configuration
└── __tests__/                  # Unit tests
    ├── calculateComponents.test.ts
    ├── grouping.test.ts
    └── StuffCombobox.test.tsx
```

## Contributing

We welcome contributions to improve the Foxhole Materials Calculator! Whether you're fixing bugs, adding new vehicles, updating recipes, or improving documentation, your help is appreciated.

### Development Setup

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Make your changes** following the guidelines below
5. **Test thoroughly** before submitting

### Development Guidelines

#### Code Quality Requirements
- **Linting**: All code must pass `npm run lint`
- **Formatting**: Use `npm run format` to maintain consistent style
- **Testing**: Maintain 100% test coverage for new/changed code
- **TypeScript**: Keep strict type checking enabled

#### Required Validation Steps
Always run these commands before submitting changes:

```bash
npm run lint           # ESLint validation (must pass)
npm run format:check   # Code formatting check
npm test              # All tests must pass
npm run build         # Production build must succeed
```

#### Testing Requirements
- **Unit tests**: Write tests for all new functions and components
- **Place tests** in `src/__tests__/` with `.test.ts` or `.test.tsx` extensions
- **Follow patterns**: Use existing test structure as examples
- **Test coverage**: Include both success and error scenarios
- **Mock dependencies**: Mock external APIs and complex dependencies

#### Adding New Materials
1. Add to appropriate enum in `src/lib/models.ts`
2. Add to `availableMaterials` array
3. Create recipes in `src/lib/recipes.ts`
4. Update `RecipiesByStuff` map
5. **Required**: Add comprehensive unit tests

#### Adding New Vehicles
1. Add to `Vehicles` enum in `src/lib/models.ts`
2. Create multiple recipes (garage vs mass production) in `src/lib/recipes.ts`
3. Add to `RecipiesByStuff` map
4. Add icon mapping in `src/lib/constants.ts`
5. **Required**: Write tests for all recipes and calculations

#### Modifying Calculations
- Core logic is in `src/lib/services/calculateComponents.ts`
- Recipe tree building in `src/lib/features/desiredSlice.ts`
- **Required**: Add tests for any calculation changes
- **Test edge cases**: Crate production, excess calculations, scaling

### Submitting Changes

#### Pull Request Process
1. **Create a branch** from main: `git checkout -b feature/your-feature-name`
2. **Make focused changes**: Keep PRs small and focused on one feature/fix
3. **Test thoroughly**: Run all validation commands
4. **Write clear commits**: Descriptive commit messages
5. **Update documentation**: If your change affects usage
6. **Submit PR**: Include description of changes and testing performed

#### PR Requirements
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Code is formatted (`npm run format:check`)
- [ ] New features have tests
- [ ] Documentation updated if needed

### Common Development Tasks

#### Manual Testing Scenarios
Always test these workflows after changes:

1. **Basic calculation**: Select "Construction Materials", set quantity 5, verify 50 Salvage
2. **Vehicle calculation**: Select "T3 Xiphos", set quantity 5, verify complex recipe tree
3. **Recipe switching**: Test different production methods in right panel
4. **UI responsiveness**: Verify layout works on different screen sizes

#### Debugging Tips
- Use `npm run dev` for hot-reload development
- Check browser console for React warnings
- Use Redux DevTools for state debugging
- Icons load from foxhole.wiki.gg - verify network connectivity

### Architecture Notes

#### State Management
- **Redux Toolkit** for complex calculator state
- **Immutable updates** using Immer (built into Redux Toolkit)
- **Typed selectors** for type-safe state access

#### Recipe System
- **Tree structure**: Recipes can depend on other recipes
- **Multiple options**: Each material can have various production methods
- **Calculation engine**: Handles scaling, excess tracking, and optimization

#### Component Architecture
- **Separation of concerns**: Components focus on UI, logic in services
- **Reusable components**: StuffIcon, StuffCombobox used throughout
- **Accessible design**: Proper ARIA labels and keyboard navigation

### Deployment

The application automatically deploys to GitHub Pages when changes are merged to main:

1. **GitHub Actions** runs lint and test validation
2. **Build process** creates static export in `./out/`
3. **Deployment** updates live site at https://macmaczhl.github.io/foxhole-materials-calculator/

#### Local Production Testing
```bash
npm run build    # Create production build
npm start        # Serve production build locally
```

### Getting Help

- **Issues**: Check [existing issues](https://github.com/macmaczhl/foxhole-materials-calculator/issues)
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Maintainers will review PRs promptly

### Recipe Data Sources

Recipe data is based on current Foxhole game mechanics. When updating:
- Verify recipes against current game version
- Include source/validation in PR description
- Test calculations with known examples

Thank you for contributing to make the Foxhole Materials Calculator better for the community!
