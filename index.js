const puppeteer = require('puppeteer');
const utils = require('./utils')
const { Variables } = require("./variables");

const fileName = `file_${new Date().toISOString().replace(/:/g, '-')}`;
const dateStart = new Date("01/02/2023");
const dateEnd = new Date("04/30/2023");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
        defaultViewport: null
    });

    for (const city of Variables.CITIES) {
        for (const branchOffice of city.branchOffices) {
            const schedule = utils.findSchedule(branchOffice.id);
            for (const camera of branchOffice.cameras) {
                const page = await browser.newPage();
                await page.goto(camera.login_url);
                await page.waitForSelector('#username');
                await page.type('#username', city.creadentials.username);
                await page.type('#password', city.creadentials.password);
                await page.click('.btn.btn-primary.login-btn');
                await page.waitForSelector('.pointer.ng-binding')
                await page.goto(camera.report_url);
                await page.waitForSelector('.Wdate.ng-isolate-scope');

                let date = dateStart;
                let iframe;
                while (date < dateEnd) {
                    const currentDaySchedule = schedule[date.getDay()];

                    if (!iframe) {
                        await page.waitForFunction(() => {
                            const div = document.querySelector('body > div[style="position: absolute; top: -1970px; left: -1970px;"]');
                            return div && div.querySelector('iframe');
                        }, { timeout: 3000 })
                        iframe = await page.$('body > div[style="position: absolute; top: -1970px; left: -1970px;"] > iframe');
                    }

                    const inframe = await iframe.contentFrame();
                    await inframe.$$eval('.WdayTable > tbody > tr:nth-child(2) > td:first-child', tds => {
                        const td = tds[0];
                        td.setAttribute('onclick', 'day_Click(2023, 1, 1)');
                        td.click();
                        () => (day_Click(2023, 1, 1))
                        console.log("se hizo click");
                    });
                    // const attribute = await inframe.$$eval('.WdayTable > tbody > tr:nth-child(2) > td:first-child', (tds, year, month, day) => {
                    //     const td = tds[0];
                    //     td.setAttribute('onclick', `day_Click(${year}, ${month}, ${day})`);
                    //     return td.getAttribute('onclick');
                    // }, date.getFullYear(), date.getMonth() + 1, date.getDate());
                    await page.click('.btn.search-btn');
                    await page.waitForTimeout(3000);
                    const spanTexts = await page.$$eval('.table-body > div > span', spans => {
                        return spans.map(span => span.textContent);
                    });

                    const trafic = utils.getScheduledTrafic(spanTexts, currentDaySchedule);
                    const finalResult = {
                        year: date.getFullYear(),
                        month: date.getMonth() + 1,
                        day: date.getDate(),
                        branchOffice: branchOffice.id,
                        city: city.id,
                        trafic: trafic
                    }

                    utils.uploadToFile(fileName, finalResult);
                    date.setDate(date.getDate() + 1);
                }
            }

            //aquí es el uploadToFile
        }
    }

    await browser.close();
})();
