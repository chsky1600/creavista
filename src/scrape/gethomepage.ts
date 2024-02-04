import { Builder } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import fs from 'fs';

export async function takeScreenshot(url: string, savePath: string) {
    const options = new chrome.Options();
    const driver = await new Builder().setChromeOptions(options).forBrowser('chrome').build();

    try {
        // Navigate to the page
        await driver.navigate().to(url);
        console.log(`Navigated to ${url}`);

        // Scroll to the top of the page before taking a screenshot
        await driver.executeScript(`window.scrollTo(0, 0);`);

        // Capture a screenshot
        const encodedString = await driver.takeScreenshot();

        // Save the screenshot to the specified path
        await fs.promises.writeFile(savePath, encodedString, 'base64');
        console.log(`Screenshot saved to ${savePath}`);
    } catch (error) {
        console.log(`Failed to navigate to ${url}: ${error instanceof Error ? error.message : error}`);
    } finally {
        await driver.quit();
    }
}