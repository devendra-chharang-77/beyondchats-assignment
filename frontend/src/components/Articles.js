import { useEffect, useState } from "react";
import { fetchArticles } from "../services/api";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Articles</h2>

      {articles.length === 0 && <p>No articles found</p>}

      {articles.map((article) => (
        <div key={article._id} style={{ marginBottom: "15px" }}>
          <h3>{article.title}</h3>
          <a href={article.link} target="_blank" rel="noreferrer">
            Read Article
          </a>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Articles;
