 
 const puppeteer=require("puppeteer");
 
 
 async function scrapeLogic(res, link){
let news=[];
const url = `https://economictimes.indiatimes.com/tech/${link}`;
console.log(url);
const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: false,
});
const page = await browser.newPage();
await page.goto(url);
    try{
      
  
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
    res.json(news);
     browser.close();
  
    }catch
    {
     browser.close();
     res.send([]);
        
    }
    // if (news.length >= 5) {
    //   return await postGenerator(news.splice(5), type);
    // } else {
    //   return await postGenerator(news, type);
    // }
  }



async function run(res,link,news){
    await scrapeLogic(res, link);

}





module.exports={scrapeLogic, run};