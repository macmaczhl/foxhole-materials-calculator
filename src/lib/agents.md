# Adding New Icons to ICONS_MAP

This guide explains how to add new icons to the `ICONS_MAP` constant in `src/lib/constants.ts`.

## Process

1. **Navigate to the Foxhole Wiki**
   - Go to the vehicle or resource page on the Foxhole wiki site
   - Find the image of the item you want to add

2. **Extract the Icon Name**
   - Right-click on the image and select "Copy image address" or "Copy image URL"
   - The URL will look like: `/images/FieldMultiWItemIcon.png?ab32ea`
   - Extract the icon name by taking the part between `/images/` and `.png`
   - In the example above, the icon name would be: `FieldMultiWItemIcon`

3. **Add to ICONS_MAP**
   - Open `src/lib/constants.ts`
   - Find the `ICONS_MAP` constant
   - Add a new entry in the appropriate section (Materials, Liquids, Raw Resources, or Vehicles)
   - Format: `[ItemName, "IconName"]`

## Example

```typescript
// Before
[Vehicles.WaspNest, "FieldMultiWItemIcon"],

// After adding a new vehicle
[Vehicles.WaspNest, "FieldMultiWItemIcon"],
[Vehicles.NewVehicle, "NewVehicleIcon"],
```

## Important Notes

- Icon names should match exactly what appears in the Foxhole wiki URL
- Do not include the `.png` extension or query parameters
- Maintain alphabetical order within each section when possible
- Ensure the item name matches the corresponding constant from the models file
- Test that the icon loads correctly after adding

## URL Pattern

The Foxhole wiki uses this URL pattern for icons:
```
/images/[IconName].png?[hash]
```

Where:
- `[IconName]` is what you need to extract
- `[hash]` is a cache-busting parameter that should be ignored
