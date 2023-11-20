
const puppeteer = require("puppeteer");
require('dotenv').config()
const {News}=require("./db/indexDB");

async function scrapeLogic(res, link) {
    let news = [];
    const url = `https://economictimes.indiatimes.com/tech/${link}`;
    console.log(url);
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url,{timeout: 0});
    try {


        const newsHandles = await page.$$(".article-list> .story-box.clearfix");

        for (const newshandle of newsHandles) {
            const titleElement = await newshandle.$("div.desc > h4 > a");

            const title = await page.evaluate(
                (el) => el.querySelector("div.desc > h4 > a").textContent,
                newshandle
            );
            const link = await page.evaluate(
                (el) => el.getAttribute("href"),
                titleElement
            );
            const about = await page.evaluate(
                (gl) => gl.querySelector(" div.desc > p").textContent,
                newshandle
            );

            news.push({
                title: title,
                desc: about,
                link: `economictimes.indiatimes.com${link}`,
            });
        }
        console.log("successfully news scraped")
        if(link=="technology"){
           
            await News.findByIdAndUpdate(process.env.NEWS_ID, { techNews: news });

        }else if(link=="funding"){
            await News.findByIdAndUpdate(process.env.NEWS_ID, { fundingNews: news });

        }else if(link=="startups"){
            await News.findByIdAndUpdate(process.env.NEWS_ID, { startupNews: news });

        }
        
       
        browser.close();
        res.sendStatus(200);

    } catch(e)
    {
        browser.close();
        res.status(500).send(e.message);

    }
    
}



async function run(res, link) {
    await scrapeLogic(res, link);

}





module.exports = { scrapeLogic, run };