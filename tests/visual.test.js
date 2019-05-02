
require('dotenv').config()


require("chromedriver");
const { By } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { Eyes, Target, ConsoleLogHandler } = require("@applitools/eyes-selenium");

jest.setTimeout(20000)

function multiply(a,b){
    return a*b;
}

test('multiplies 2 * 2 to equal 4', () => {
    expect(multiply(2,2)).toBe(4)
})

async function UITest(){
    describe("Application should", () => {
        let driver;
        let eyes;

        beforeAll( async () => {
            try {

                const chrome_options  = new chrome.Options()
                chrome_options.addArguments('--headless')
                chrome_options.addArguments('--no-sandbox')
                chrome_options.addArguments('--disable-dev-shm-usage')
                driver = new webdriver.Builder()
                    .withCapabilities(webdriver.Capabilities.chrome())
                    .setChromeOptions(chrome_options)
                    .build()
                eyes = new Eyes();
                const apiKey = process.env.APPLITOOLS_API_KEY;
                const batchName = null; 
                const batchID = process.env.APPPLITOOLS_BATCH_ID;

                console.log("this is the batchID: ", batchID)
                eyes.setApiKey(apiKey);
                eyes.setBatch(null,batchID)

                await eyes.open(driver, "Travisci Integration", "initial test" ); //driver, app name, test name
                await driver.get("http://localhost:9000/")
                //await driver.get("file:///Users/nicklee/Documents/nickleehampshire/applitoolsCI/build/index.html")      


            } catch(err){
                // fail entire test?
                console.error(err);
            }
        })

        afterAll( async() => {
            await eyes.close(false);
            await driver.quit();
            await eyes.abortIfNotClosed();

        })

        it("look the same", async () => {
            const result = await eyes.checkWindow("first check").then(function(result){console.log('data:',result); return result});
    
            const isItTheSame = result._asExpected;
            expect(isItTheSame).toBeTruthy();
    
        })

      
    })
}

UITest()
console.log(process.env.APPLITOOLS_API_KEY)
