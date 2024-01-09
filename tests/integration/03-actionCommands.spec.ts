import { test } from '@playwright/test'
import { clickButton, clickLink } from '../../helpers/clickHelpers'

test.describe('User Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Html Elements')
  })

  test('User action - Click and Hover', async ({ page }) => {
    const dropDownButton = page.locator('#dropdown-button')

    await dropDownButton.hover()

    await clickButton(page, 'Register')
  })

  test('User Actions - Type', async ({ page }) => {
    const textInput1 = page.locator('#text_input1')

    console.log(await page.viewportSize())

    await textInput1.fill('Cypress')
    //automatically erases the previous one when you type in the same field
    await textInput1.fill('Playwright')
  })

  test('User Actions - Checkbox and Radio Buttons', async ({ page }) => {
    const apple = page.getByRole('checkbox', { name: 'Apple' })
    // const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    // const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    await apple.check()
    await apple.uncheck()

    //Loop through apple, microsoft, tesla and check and uncheck them

    const checkboxGroup = page.locator('#checkbox-button-group input')

    const checkboxCount = await checkboxGroup.count()

    for (let i = 0; i < checkboxCount; i++) {
      await checkboxGroup.nth(i).check()
      await checkboxGroup.nth(i).uncheck()
    }
    // another way

    const checkboxGroup2 = await await page.locator('#checkbox-button-group input').all()

    for (const check of checkboxGroup2) {
      await check.check()
      await check.uncheck()
    }

    //    checkboxGroup2.forEach(async (el) => {
    //     await el.check()
    //     await el.uncheck()
    //    })
  })

  test('User Actions - Dropdowns', async ({ page }) => {
    const companyDropdown = page.locator('#company_dropdown1')

    //select the option with the index of 1
    await companyDropdown.selectOption({ index: 1 })

    //Select the option by its label "Apple"
    await companyDropdown.selectOption({ label: 'Apple' })

    //Select the option by its value
    await companyDropdown.selectOption({ value: 'Tesla' })
  })

  test('User Actions - Calendar/Date Picker', async ({ page }) => {
    const date1 = page.locator('#date_input1')
    const date2 = page.locator('#date_input2')

    await date1.fill('01/01/2000')
    await page.keyboard.press('Enter')

    await date2.fill('01/03/2022')
    await page.keyboard.press('Enter')
  })
})
