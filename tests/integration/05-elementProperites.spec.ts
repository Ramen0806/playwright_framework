import {test} from "@playwright/test";
import { clickLink } from "../../helpers/clickHelpers";

test.describe('Element Properties',() => {
    test.beforeEach(async ({page}) => {

        await page.goto('https://techglobal-training.com/frontend')

        await clickLink(page, 'Html Elements')

    })

    test('Getting Element Properties ', async ({page}) => {
        
        const headings = page.locator('[data-identifier="Headings"]')

        // Returns an array
        const allInnerText = await headings.allInnerTexts()

        console.log(allInnerText)

        // Returns a single string, which alrady has the child elements
        const innerText = await headings.innerText()
        console.log(innerText)

        // Returns the element of inner elements
        const innerHtml = await headings.innerHTML()

        console.log(innerHtml)

        const textContent = await headings.textContent()
        console.log(textContent)

        const innerElements =  headings.locator('h4')
        console.log(await innerElements.count())

        const attr = await headings.getAttribute('data-identifier')
        console.log(attr)

        const companyDropdown =  page.locator('#company_dropdown1')

        await companyDropdown.selectOption({ index: 1})

        console.log(await companyDropdown.inputValue())

    })

    test('Executing JavaScript code in playwright',async({page}) => {
        const result = await page.evaluate(() => {
            //Javascript code to be excuted in the browser
            return document.title

            
        })
        console.log(result)

        const href = await page.evaluate(() => {
            return document.location.href
        })
        console.log(href)

        const element  = page.locator('#main_heading')
        const backgroundColor = await element.evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor
        
        })
        console.log(backgroundColor)

        // const x = 10
        // const y = 20

        // const getResult = await page.evaluate(() => {
        //     ([a,b]) => {
        //         return a + b
        //     }
        //     [x,y]
        // })
        // console.log(getResult)

        
    })

})