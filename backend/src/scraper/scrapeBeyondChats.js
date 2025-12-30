const axios = require("axios");
const cheerio = require("cheerio");
const Article = require("../models/Article");

const LAST_PAGE_URL = "https://beyondchats.com/blogs/page/15/";

const scrapeBeyondChats = async () => {
  const { data } = await axios.get(LAST_PAGE_URL);
  const $ = cheerio.load(data);

  const articles = [];

  $(".entry-title a").slice(0, 5).each((i, el) => {
    articles.push({
      title: $(el).text().trim(),
      link: $(el).attr("href")
    });
  });

  for (let article of articles) {
    await Article.updateOne(
      { link: article.link },
      { $setOnInsert: article },
      { upsert: true }
    );
  }

  return articles;
};

module.exports = scrapeBeyondChats;
