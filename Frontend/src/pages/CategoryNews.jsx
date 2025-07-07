import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Category from "../components/Category";
import Search from "../components/Search";
import Header from "../components/Header";
import PopularNews from "../components/news/PopularNews";
import RecentNews from "../components/news/RecentNews";
import NewsCard from "../components/news/items/NewsCard";
import SimpleDetailsNewCard from "../components/news/items/SimpleDetailsNewCard";
import Footer from "../components/Footer";
import { base_api_url } from "../config/config";

const CategoryNews = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/category/news/${category}`);
        const data = await res.json();
        setNews(data.news || []);
      } catch (error) {
        console.error("Error fetching category news:", error);
      }
    };

    if (category) {
      fetchCategoryNews();
    }
  }, [category]);

  return (
    <div>
      <Header />
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="category" two={category} />
        </div>
      </div>

      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            {/* Main News Grid */}
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.isArray(news) && news.length > 0 ? (
                    news.map((item, i) => (
                      <SimpleDetailsNewCard key={i} news={item} type="details-news" height={200} />
                    ))
                  ) : (
                    <p className="text-gray-600">No news found in this category.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <PopularNews type="Popular news" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryNews;
