import {test} from "@playwright/test";

test.describe('Playwright Locators',() => {

    test('Playwright Locator API', async({ page }) => {

        await page.goto('https://techglobal-training.com')

        const myLogo = page.locator('#logo')

        await myLogo.click()

        /**
         * Note: Locator API in Playwright is a generic API that can be used to locate any element on the page
         * It can be used to locate elements using different locator strategies like CSS and XPATH
         */
    })

    test('Playwright - Custom Psuedo Classes', async( {page} ) => {

        await page.goto('https://techglobal-training.com/frontend')

        await page.goto('https://techglobal-training.com/frontend')

        // await page.locator('a', { hasText: 'Html Elements' }).click()

        await page.locator('a:has-text("Html Elements")').click()

        // These locate the given elements by their text using :text() or :has-text()
        await page.locator('button', {hasText: 'Register'}).click()

        // await page.locator('button', {hasText: 'Sign in'}).click()

        await page.locator('button:has-Text("Sign in"):visible').click()
        await page.pause() 
        

        // Locates the element in the div with the id apple_check
        await page.locator('#checkbox-button-group:has(#apple_check)').highlight()

        await page.pause()
    })

    test('Playwright - Chaining Locators', async( {page} ) => {

    await page.goto('https://techglobal-training.com/frontend')

    await page.locator('a:has-text("Html Elements")').click()

    const unorderedList = page.locator('#unordered_list')

    const getText =  unorderedList.locator('li:has-text("JavaScript")').textContent()

    console.log(getText + 'Name of element')
    })

    test('Playwright - Handling multiple elements', async( {page} ) => {

        await page.goto('https://techglobal-training.com/frontend')
    
        await page.locator('a:has-text("Html Elements")').click()
    
        const unorderedList = page.locator('#unordered_list > li')
        
        await unorderedList.first().click()
        await unorderedList.nth(1).click()
        await unorderedList.last().click()
    
        const checkboxGroup = page.locator('#checkbox-button-group input')
        const checkboxCount = await checkboxGroup.count()

        for(let i = 0; i < checkboxCount; i++ ){

            await checkboxGroup.nth(i).click()
        }

        const checkboxGroup2 = page.locator('#checkbox-button-group input').all()

        for( const checkbox of await checkboxGroup2){
            await checkbox.click()
        }

        await Promise.all(
            (await checkboxGroup2).map( async(el, index) => {

              await el.click()
            console.log(index)
            })
        )
        })
    
    test('Playwright built-in locators', async ({page}) => {

        await page.goto('https://techglobal-training.com/frontend')
    
        await page.getByRole('link',{ name: "Html Elements"}).click()

        await page.getByRole('heading',{ name: "Unordered List"}).click()

        await page.getByPlaceholder('Enter text here').click()
    })

    test.only('Playwright - filter() locator API', async ({ page}) => {

        await page.goto('https://techglobal-training.com/frontend')

        await page.getByRole('link', { name: 'Html Elements' }).click()

        const testingParagraphs = page.locator('p').filter({ hasText: 'testing'})

        const text = await testingParagraphs.textContent()

        console.log(`Text of the first paragraph: ${text}`)

        const nonLanguageheadings = page.locator('label').filter({hasNotText: 'Java'})
        const count = await nonLanguageheadings.count()

        console.log(`Numbers of elements that has not text Java is: ${count}`)

        const textOfDiv = page.locator('div').filter({ has: page.locator('h3:has-text("Headings")') })

        const headingItems = await textOfDiv.locator('h4').all()

        for( const heading of headingItems) {
            console.log(await heading.textContent())
        }
    })
})


