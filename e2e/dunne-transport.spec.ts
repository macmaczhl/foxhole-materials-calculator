import { test, expect } from "@playwright/test";

test.describe("Dunne Transport Recipe Integration", () => {
  test("should display Dunne Transport recipes when searched and selected", async ({
    page,
  }) => {
    // 1. Open the site
    await page.goto("/");

    // 2. Enter "Dunne Trans" into search
    const combobox = page.getByRole("combobox");
    await expect(combobox).toBeVisible();
    await combobox.fill("Dunne Trans");

    // 3. Select Dunne Transport from the dropdown
    // Wait for dropdown options to appear
    const option = page.getByRole("option", { name: "Dunne Transport" });
    await expect(option).toBeVisible();
    await option.click();

    // 4. Check recipes drawn for this vehicle
    // The recipe tree should appear with "Dunne Transport" as the header
    const recipesHeader = page.getByText("Recipes: Dunne Transport");
    await expect(recipesHeader).toBeVisible();

    // Verify that "Dunne Transport" is shown in the recipe selector
    const dunneTransportSelector = page
      .locator(".panel-compact")
      .filter({ hasText: "Dunne Transport" })
      .first();
    await expect(dunneTransportSelector).toBeVisible();

    // The Dunne Transport recipe selector should have 4 radio buttons for its 4 recipes:
    // Recipe 1: 100 Basic Materials → 1 Dunne Transport
    // Recipe 2: 720 Basic Materials → 9 Dunne Transport
    // Recipe 3: 900 Basic Materials → 12 Dunne Transport
    // Recipe 4: 1050 Basic Materials → 15 Dunne Transport
    const dunneTransportRadioGroup = page.getByRole("radiogroup", {
      name: "Recipe for Dunne Transport",
    });
    await expect(dunneTransportRadioGroup).toBeVisible();

    // Verify the radio group contains 4 radio buttons for the 4 recipes
    const recipeRadios = dunneTransportRadioGroup.getByRole("radio");
    await expect(recipeRadios).toHaveCount(4);

    // Verify the first recipe is selected by default (the first radio should be checked)
    // The first recipe produces 1 unit
    const firstRadio = recipeRadios.first();
    await expect(firstRadio).toBeChecked();
  });
});
