const puppeteer = require('puppeteer');

const variables = require('./variables');

const cities = variables.Variables.CITIES;
const schedules = variables.Variables.SCHEDULES;

const dateStart = new Date("01/01/2023");
const dateEnd = new Date("04/30/2023");

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    for (const city of cities) {
        for (const branchOffice of city.branchOffices) {
            for (const camera of branchOffice.cameras) {
                let date = dateStart;
                const page = await browser.newPage();
                await page.goto(camera.login_url);
                await page.waitForSelector('#username');
                await page.type('#username', city.creadentials.username);
                await page.type('#password', city.creadentials.password);
                await page.click('.btn.btn-primary.login-btn');
                await page.waitForSelector('.pointer.ng-binding')
                await page.goto(camera.report_url);
                await page.waitForSelector('.Wdate.ng-isolate-scope');

                while (date < dateEnd) {
                    // await page.$eval('.Wdate.ng-isolate-scope', (el, old_date) => {
                    //     const date = new Date(old_date);
                    //     const day = date.getDate();
                    //     const month = date.getMonth() + 1;
                    //     const year = date.getFullYear();
                    //     console.log(date);
                    //     el.value = `${year}-${month}-${day}`;
                    // }, date);
                    await page.click('.btn.search-btn');
                    await page.waitForSelector('.table-body > *', { timeout: 10000 });
                    console.log("entró");

                    const traficCounter = await page.evaluate(() => {
                        console.log("simon");
                        const divs = document.querySelectorAll('.table-body > *');
                        console.log(divs);
                        const traficCounter = [];
                        for (const div of divs) {
                            const spans = div.querySelectorAll('span');
                            console.log(spans[0].textContent);
                            console.log(spans[1].textContent);
                        }
                        return traficCounter;
                    });

                    console.log(traficCounter);

                    date.setDate(date.getDate() + 1);
                }
            }
        }
    }

    await browser.close();
})();
