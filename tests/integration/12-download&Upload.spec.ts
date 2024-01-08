import {test, expect} from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";
import fs from 'fs';

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

     expect(fs.existsSync(path)).toBeTruthy()
})

test('upload a file', async ({page}) => {
    const uploadLink = page.locator('#file_upload')
    const uploadPath = 'downloads/SampleText.txt'
    
    await uploadLink.setInputFiles(uploadPath)

    await page.click('#file_submit')
})
  
 
})