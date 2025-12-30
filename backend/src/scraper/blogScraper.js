const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/Article');

// Base URL
const BASE_URL = 'https://beyondchats.com/blogs';

// Function to get last page number
const getLastPage = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    const $ = cheerio.load(data);

    // Pagination li elements
    let lastPage = 1;
    $('.pagination li a').each((i, el) => {
      const pageNum = parseInt($(el).text());
      if (!isNaN(pageNum) && pageNum > lastPage) lastPage = pageNum;
    });

    return lastPage;
  } catch (err) {
    console.error('Error fetching last page:', err.message);
    return 1;
  }
};

// Function to scrape last page articles
const scrapeLastPage = async () => {
  try {
    const lastPage = await getLastPage();
    console.log('Last page:', lastPage);

    const { data } = await axios.get(`${BASE_URL}?page=${lastPage}`);
    const $ = cheerio.load(data);

    const articles = [];

    $('.blog-card').slice(0, 5).each((i, el) => {
      const title = $(el).find('h2').text().trim();
      const url = $(el).find('a').attr('href');
      const content = $(el).find('p').text().trim();
      const publishedDate = $(el).find('.blog-date').text().trim();

      articles.push({ title, content, url, publishedDate });
    });

    console.log('Scraped articles:', articles);

    // Save to MongoDB
    for (const art of articles) {
      const article = new Article({
        title: art.title,
        content: art.content,
        url: art.url,
        type: 'original'
      });
      await article.save();
    }

    console.log('Articles saved to DB ');
  } catch (err) {
    console.error(err.message);
  }
};

// Run scraper
scrapeLastPage();

