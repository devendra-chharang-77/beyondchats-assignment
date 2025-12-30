const Article = require("../models/Article");
const scrapeBeyondChats = require("../scraper/scrapeBeyondChats");


   //SCRAPE & SAVE ARTICLES

exports.scrapeArticles = async (req, res) => {
  try {
    const articles = await scrapeBeyondChats();
    res.json({
      message: "Articles scraped and stored successfully",
      articles,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  // CREATE ARTICLE (Manual)

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


  // READ ALL ARTICLES

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ scrapedAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  // READ ONE ARTICLE

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


   //UPDATE ARTICLE

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


  // DELETE ARTICLE

exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
