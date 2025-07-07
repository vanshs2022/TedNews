import { useEffect, useState } from "react";
import HeadLines from "../components/HeadLines";
import Header from "../components/Header";
import Title from "../components/Title";
import DetailsNews from "../components/news/DetailsNews";
import DetailsNewsCol from "../components/news/DetailsNewsCol";
import DetailsNewsRow from "../components/news/DetailsNewsRow";
import LatestNews from "../components/news/LatestNews";
import PopularNews from "../components/news/PopularNews";
import SimpleNewsCard from "../components/news/items/SimpleNewsCard";
import NewsCard from "../components/news/items/NewsCard";
import Footer from "../components/Footer";
import { base_api_url } from "../config/config";

const Home = () => {
  const [news, setNews] = useState({});
  const requiredCategories = [
    "Sports",
    "Education",
    "Technology",
    "International",
    "Health",
    "Travel",
    "Politics",
    "Recent",
    "Latest",
  ];

  // fetch all categories initially
  useEffect(() => {
    const fetchAll = async () => {
      const result = {};
      for (let cat of requiredCategories) {
        try {
          const res = await fetch(
            `${base_api_url}/api/search/news?value=${cat}`
          );
          const data = await res.json();
          if (Array.isArray(data.news)) {
            result[cat] = data.news;
          }
        } catch (err) {
          console.error(`Error fetching category "${cat}":`, err.message);
        }
      }
      setNews(result);
    };
    fetchAll();
  }, []);

  return (
    <div>
      <main>
        <Header />
        <HeadLines news={news} />

        <div className="bg-slate-100">
          <div className="px-4 md:px-8 py-8">
            {/* Latest + Technology */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                {Array.isArray(news["Latest"]) && (
                  <LatestNews news={news["Latest"]} />
                )}
              </div>

              <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
                <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                  <Title title="Technology" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    {Array.isArray(news["Technology"]) &&
                      news["Technology"]
                        .slice(0, 4)
                        .map((item, i) => (
                          <SimpleNewsCard item={item} key={i} />
                        ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Popular News */}
            {Array.isArray(news["Popular"]) && (
              <PopularNews type="Popular news" news={news["Popular"]} />
            )}

            {/* Section 1 */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  {Array.isArray(news["Sports"]) && (
                    <DetailsNewsRow
                      news={news["Sports"]}
                      category="Sports"
                      type="details-news"
                    />
                  )}

                  {Array.isArray(news["Health"]) && (
                    <DetailsNews news={news["Health"]} category="Health" />
                  )}
                </div>

                <div className="w-full lg:w-4/12">
                  {Array.isArray(news["Education"]) && (
                    <DetailsNewsCol
                      news={news["Education"]}
                      category="Education"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12">
                  {Array.isArray(news["Politics"]) && (
                    <div className="pr-2">
                      <DetailsNewsCol
                        news={news["Politics"]}
                        category="Politics"
                      />
                    </div>
                  )}
                </div>

                <div className="w-full lg:w-8/12">
                  <div className="pl-2">
                    {Array.isArray(news["Travel"]) && (
                      <DetailsNewsRow
                        news={news["Travel"]}
                        category="Travel"
                        type="details-news"
                      />
                    )}

                    {Array.isArray(news["International"]) && (
                      <DetailsNews
                        news={news["International"]}
                        category="International"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="w-full">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12">
                  {Array.isArray(news["Technology"]) && (
                    <DetailsNewsRow
                      news={news["Technology"]}
                      category="Technology"
                      type="details-news"
                    />
                  )}
                </div>

                <div className="w-full lg:w-4/12">
                  <div className="pl-2">
                    <Title title="Recent news" />
                    {Array.isArray(news["Recent"]) &&
                      news["Recent"]
                        .slice(0, 5)
                        .map((item, i) => <NewsCard item={item} key={i} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
