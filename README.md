Project Overview:-
This project scrapes articles from the BeyondChats blog, stores them in a database, exposes CRUD APIs, and displays the articles on a React frontend.
The focus of this assignment is:
Clean backend architecture
Correct scraping logic
Database integration
Simple and clear frontend

Scraping Logic (IMPORTANT):-
We inspected the pagination on the BeyondChats blog.
The last pagination page is /page/15, which contains the oldest articles.
The scraper directly targets this last page.

****:- The last page currently contains 1 article, so only that article is scraped and shown.

Architecture / Data Flow:-
Scraper (Cheerio + Axios)
        ↓
MongoDB (Articles Collection)
        ↓
Express REST APIs (CRUD)
        ↓
React Frontend (Article List)


Tech Stack
Backend
Node.js
Express.js
MongoDB + Mongoose
Axios
Cheerio
dotenv
CORS
Frontend
React.js
Axios

Project Structure
beyondchats-assignment/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scraper/
│   │   └── app.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│
└── README.md


Local Setup Instructions
1️ Clone Repository
git clone <your-github-repo-link>
cd beyondchats-assignment

2️ Backend Setup
cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/beyondchats_db


Start backend:
npm start
Health check:
http://localhost:5000/health

3️ Run Scraper API
POST http://localhost:5000/api/articles/scrape
This will:
Scrape articles from last page
Store them in MongoDB

4️ Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:
http://localhost:3000

API Endpoints
Method	               Endpoint	                Description
GET	                   /api/articles	          Fetch all articles
POST	                 /api/articles	          Create article
PUT	                   /api/articles/:id	      Update article
DELETE	               /api/articles/:id	      Delete article
POST	                 /api/articles/scrape   	Scrape oldest articles




