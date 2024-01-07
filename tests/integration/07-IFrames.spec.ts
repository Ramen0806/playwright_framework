import {test, expect} from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

  });

  test('IFrames - Switching to an IFrame', async ({page}) => {

    await clickLink(page, "IFrames");

    const frameLocator = page.frameLocator('#form_frame')
  
    const inputFields = frameLocator.locator('#first_name, #last_name')
    const inputFieldsCount = await inputFields.count()
    
    const submitBtn = frameLocator.locator('#submit')
    const result = page.locator('#result')

    const firstName = 'John'
    const lastName = 'Doe'
    
    for(let i = 0; i < inputFieldsCount; i++){
        await inputFields.nth(i).fill(i == 0 ? firstName : lastName)
    }
   
    await submitBtn.click()

    await expect(result).toHaveText(`You entered: ${firstName} ${lastName}`)


  })

})
