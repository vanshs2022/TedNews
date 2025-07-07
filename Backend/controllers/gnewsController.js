const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const gnewsModel = require('../models/gnewsModel');
require('dotenv').config();

const categorizeNews = (title, description) => {
    const categories = {
        sports: ["cricket", "football", "sports", "match", "tournament", "player", "goal", "score"],
        international: ["world", "global", "foreign", "UN", "international", "overseas", "diplomat", "embassy"],
        technology: ["AI", "tech", "software", "hardware", "computer", "gadget", "internet", "cyber"],
        india: ["India", "Modi", "Delhi", "Mumbai", "Indian", "BJP", "Lok Sabha", "state", "election"],
        education: ["exam", "school", "university", "student", "college", "education", "syllabus", "admission"]
    };

    const text = (title + " " + description).toLowerCase();

    for (let [category, keywords] of Object.entries(categories)) {
        for (let word of keywords) {
            if (text.includes(word.toLowerCase())) {
                return category;
            }
        }
    }

    return "general";
};

const gnews_fetch_and_store = async (req, res) => {
    const { value } = req.query;

    if (!value) {
        return res.status(400).json({ message: "Query parameter 'value' is required." });
    }

    try {
        const existing = await gnewsModel.find({ keyword: value });
        if (existing.length > 0) {
            return res.status(200).json({ message: 'Articles retrieved from local DB', news: existing });
        }

        const response = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(value)}&lang=en&max=10&token=${process.env.GNEWS_API_KEY}`);
        const data = await response.json();
        const articles = data.articles;

        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: 'No articles found from GNews.' });
        }

        const savedArticles = [];

        for (let article of articles) {
            const detectedCategory = categorizeNews(article.title, article.description || "");

            const newsItem = new gnewsModel({
                writerId: "000000000000000000000000",
                writerName: article.source.name || "GNews",
                title: article.title,
                url: article.url,
                image: article.image || "https://via.placeholder.com/150",
                category: detectedCategory,
                description: article.description || "",
                date: article.publishedAt,
                count: 0,
                keyword: value
            });

            try {
                const saved = await newsItem.save();
                savedArticles.push(saved);
            } catch (err) {
                if (err.code === 11000) {
                    continue;
                } else {
                    console.error("Unexpected DB error while saving article:", err);
                }
            }
        }

        return res.status(201).json({ message: 'Articles fetched from GNews and stored', news: savedArticles });

    } catch (error) {
        console.error("Error during GNews fetch or save:", error);
        return res.status(500).json({ message: 'Failed to fetch or store GNews articles', error: error.message });
    }
};

module.exports = {
    gnews_fetch_and_store
};
