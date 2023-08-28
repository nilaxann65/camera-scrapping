const puppeteer = require('puppeteer');

const variables = require('./variables');
const utils = require('./utils');

const cities = variables.Variables.CITIES;
const schedules = variables.Variables.SCHEDULES;
const formatDate = utils.formatDate;

const dateStart = new Date("01/01/2023");
const dateEnd = new Date("04/30/2023");

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    while (dateStart < dateEnd) {
        for (const city of cities) {
            for (const branchOffice of city.branchOffices) {
                for (const camera of branchOffice.cameras) {
                    const page = await browser.newPage();
                    await page.goto(camera.login_url);
                    await page.waitForSelector('#username');
                    await page.type('#username', city.creadentials.username);
                    await page.type('#password', city.creadentials.password);
                    await page.click('.btn.btn-primary.login-btn');
                    await timeout(10000);

                    await page.goto(camera.report_url);
                    await page.waitForSelector('.Wdate.ng-isolate-scope');
                    await page.type('.Wdate.ng-isolate-scope', formatDate(dateStart));
                    await page.click('.btn.search-btn');
                    await timeout(1000);

                }
            }
        }

        dateStart.setDate(dateStart.getDate() + 1);
    }
    await browser.close();
})();
