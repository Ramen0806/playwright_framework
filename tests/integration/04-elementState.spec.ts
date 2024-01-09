import { test } from '@playwright/test'
import { clickLink } from '../../helpers/clickHelpers'

test.describe('Element State', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend')

    await clickLink(page, 'Html Elements')
  })

  test('Getting Element State', async ({ page }) => {
    const registerBttn = await page.getByRole('button', { name: 'Register' })
    const signInBttn = await page.getByRole('button', { name: 'Sign in' })
    const bttnMessage = page.locator('.mt-1')

    // const registerBttnState = await registerBttn.isEnabled()
    const isMessageVisible = await bttnMessage.isVisible()

    isMessageVisible ? await signInBttn.click() : await registerBttn.click()
  })

  test('Getting Element Stae - Checkbox  and Radio buttons', async ({ page }) => {
    const apple = page.getByRole('checkbox', { name: 'Apple' })
    const microsoft = page.getByRole('checkbox', { name: 'Microsoft' })
    const tesla = page.getByRole('checkbox', { name: 'Tesla' })

    const isAppleChecked = await apple.isChecked()

    if (isAppleChecked) {
      await microsoft.check()
      await tesla.check()
    } else {
      await apple.check()
    }
  })
})
