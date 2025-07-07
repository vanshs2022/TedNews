const { formidable } = require("formidable");
const gnewsModel = require("../models/gnewsModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const moment = require("moment");
const gnewsController = require("./gnewsController");

class newsController {
  add_news = async (req, res) => {
    const { id, name } = req.userInfo;
    const form = formidable({ multiples: false });

    try {
      const [fields] = await form.parse(req);
      const { title, description, image, url } = fields;

      const detectedCategory = this.categorizeNews(title[0], description[0]);

      const news = await gnewsModel.create({
        writerId: id,
        writerName: name,
        title: title[0].trim(),
        url: url ? url[0] : "",
        image: image[0],
        category: detectedCategory,
        description: description[0],
        date: moment().format("LL"),
        count: 0,
        keyword: "",
      });

      return res
        .status(201)
        .json({ message: "GNews article added successfully", news });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  update_news = async (req, res) => {
    const { news_id } = req.params;
    const form = formidable({ multiples: false });

    try {
      const [fields] = await form.parse(req);
      const { title, description, image } = fields;

      const news = await gnewsModel.findByIdAndUpdate(
        news_id,
        {
          title: title[0].trim(),
          description: description[0],
          image: image[0],
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "GNews article update success", news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  update_news_update = async (req, res) => {
    const { role } = req.userInfo;
    const { news_id } = req.params;
    const { status } = req.body;

    if (role === "admin") {
      const news = await gnewsModel.findByIdAndUpdate(
        news_id,
        { status },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "GNews article status update success", news });
    } else {
      return res.status(401).json({ message: "You cannot access this api" });
    }
  };

  get_images = async (req, res) => {
    const { id } = req.userInfo;

    try {
      const images = await gnewsModel
        .find({ writerId: new ObjectId(id) }, { image: 1, _id: 0 })
        .sort({ createdAt: -1 });

      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_recent_news = async (req, res) => {
    try {
      req.query.value = "latest";
      return gnewsController.gnews_fetch_and_store(req, res);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_category_news = async (req, res) => {
  const { category } = req.params;
  const allowed = ['sports', 'education', 'technology', 'international', 'health'];

  try {
    // Check if any news exists for that category
    const news = await gnewsModel.find({ category });

    // If found, return it
    if (news.length > 0) {
      return res.status(200).json({ news });
    }

    // If not found and it's in the allowed list, fetch using GNews
    if (allowed.includes(category)) {
      const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
      const response = await fetch(`https://gnews.io/api/v4/search?q=${category}&lang=en&max=10&token=${process.env.GNEWS_API_KEY}`);
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        return res.status(404).json({ message: "No articles found from GNews." });
      }

      const savedArticles = [];

      for (let article of data.articles) {
        const newsItem = new gnewsModel({
          writerId: "000000000000000000000000",
          writerName: article.source.name || "GNews",
          title: article.title,
          url: article.url,
          image: article.image || "https://via.placeholder.com/150",
          category: category, // save under the requested category
          description: article.description || "",
          date: article.publishedAt,
          count: 0,
          keyword: category
        });

        try {
          const saved = await newsItem.save();
          savedArticles.push(saved);
        } catch (err) {
          if (err.code === 11000) continue;
        }
      }

      return res.status(201).json({ news: savedArticles });
    }

    return res.status(404).json({ message: "Invalid category or no data found." });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};


  categorizeNews = (title, description) => {
    const categories = {
      sports: [
        "cricket", "football", "sports", "match", "tournament", "player", "goal", "score"
      ],
      international: [
        "world", "global", "foreign", "UN", "international", "overseas", "diplomat", "embassy"
      ],
      technology: [
        "AI", "tech", "software", "hardware", "computer", "gadget", "internet", "cyber"
      ],
      india: [
        "India", "Modi", "Delhi", "Mumbai", "Indian", "BJP", "Lok Sabha", "state", "election"
      ],
      education: [
        "exam", "school", "university", "student", "college", "education", "syllabus", "admission"
      ],
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

  news_search = async (req, res) => {
    const { value } = req.query;
    try {
      const news = await gnewsModel.find({
        $text: { $search: value },
      });

      if (news.length === 0) {
        return gnewsController.gnews_fetch_and_store(req, res);
      }

      return res.status(201).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_news = async (req, res) => {
    const { id, role } = req.userInfo;
    try {
      const query = role === "admin" ? {} : { writerId: new ObjectId(id) };
      const news = await gnewsModel.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_dashboard_single_news = async (req, res) => {
    const { news_id } = req.params;
    try {
      const news = await gnewsModel.findById(news_id);
      return res.status(200).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_all_news = async (req, res) => {
    try {
      const category_news = await gnewsModel.aggregate([
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$category",
            news: {
              $push: {
                _id: "$_id",
                title: "$title",
                writerName: "$writerName",
                image: "$image",
                description: "$description",
                date: "$date",
                category: "$category",
                url: "$url",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            news: { $slice: ["$news", 5] },
          },
        },
      ]);

      const news = {};
      for (let i = 0; i < category_news.length; i++) {
        news[category_news[i].category] = category_news[i].news;
      }

      return res.status(200).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_news = async (req, res) => {
    const { slug } = req.params;

    try {
      const news = await gnewsModel.findOneAndUpdate(
        { url: slug },
        { $inc: { count: 1 } },
        { new: true }
      );

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      const relateNews = await gnewsModel
        .find({ url: { $ne: slug }, category: news.category })
        .limit(4)
        .sort({ createdAt: -1 });

      return res.status(200).json({ news, relateNews });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_categories = async (req, res) => {
    try {
      const categories = await gnewsModel.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_popular_news = async (req, res) => {
    try {
      const popularNews = await gnewsModel
        .find({})
        .sort({ count: -1 })
        .limit(4);

      if (popularNews.length === 0) {
        req.query.value = "popular";
        return gnewsController.gnews_fetch_and_store(req, res);
      }

      return res.status(200).json({ popularNews });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_latest_news = async (req, res) => {
    try {
      const news = await gnewsModel.find({}).sort({ createdAt: -1 }).limit(6);

      if (news.length === 0) {
        req.query.value = "latest";
        return gnewsController.gnews_fetch_and_store(req, res);
      }

      return res.status(200).json({ news });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  get_images = async (req, res) => {
    try {
      const images = await gnewsModel.aggregate([
        { $sample: { size: 9 } },
        { $project: { image: 1 } },
      ]);

      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new newsController();
