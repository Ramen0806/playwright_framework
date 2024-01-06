import {test, expect} from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    await clickLink(page, "Html Elements");
  })

  test('Auto-retry, web-first async locator assertions', async ({page}) => {
    const mainHeading = page.locator('#main_heading')

    await expect(mainHeading).toBeVisible()

    //Checks if element is attached to the DOM
    await expect(mainHeading).toBeAttached()

    await expect(mainHeading).toHaveText('Html Elements')

    await expect(mainHeading).toContainText('Elements')

    await expect(mainHeading).toHaveAttribute('id')
    await expect(mainHeading).toHaveAttribute('id', 'main_heading')

    await expect(mainHeading).toHaveCount(1)

    await expect(mainHeading).toHaveCSS('color','rgb(105, 105, 105)')
    // await expect(mainHeading)

    const checkbox1 = page.locator('#checkbox_1')

    await expect(checkbox1).toBeEnabled()
    await checkbox1.check()
    await expect(checkbox1).toBeChecked()

    const textInput = page.locator('#text_input1')

    await expect(textInput).toBeEmpty()

    // await expect(textInput).toHaveAttribute('placeholder')
    await textInput.fill('TechGlobal')

    // await expect(textInput).toHaveText('TechGlobal')

    const orderedList = page.locator('#ordered_list > li')

    const arr = ['Cypress','Playwright', 'Selenium Webdriver']

    await expect(orderedList).toHaveText(arr)

    })

    test('Non-retry Assertions', async ({page}) => {
        const num = 1
        expect(num).toBe(1)
        expect(num).toBeLessThan(2)
        expect(num).toBeLessThanOrEqual(1)

        expect(num).not.toBeGreaterThan(0)
    })
})