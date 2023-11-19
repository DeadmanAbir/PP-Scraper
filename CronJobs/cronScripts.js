
require('dotenv').config();

async function scrapeNewsAndSave(){
    const techResponse=await fetch(process.env.TECH_URL);
    const fundResponse=await fetch(process.env.FUND_URL);
    const startupResponse=await fetch(process.env.STARTUP_URL);
}

module.exports={
    scrapeNewsAndSave
}