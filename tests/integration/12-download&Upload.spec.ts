import test from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe("Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://techglobal-training.com/frontend");

    await clickLink(page, "File Download & Upload");
  });
test('download a file', async ({page}) => {
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.click('#file_download')
    
      ])
      const path = 'downloads/' + download.suggestedFilename();

      await download.saveAs(path)
})

test('upload a file', async ({page}) => {
    const uploadLink = page.locator('#file_upload')
    
    await uploadLink.setInputFiles('downloads/SampleText.txt')

    await page.click('#file_submit')
})
  
 
})