import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import Category from '../components/Category';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Title from '../components/Title';
import PopularNews from '../components/news/PopularNews';
import NewsCard from '../components/news/items/NewsCard';
import SimpleDetailsNewCard from '../components/news/items/SimpleDetailsNewCard';
import htmlParser from 'html-react-parser';
import { base_api_url } from '../config/config';
import RelatedNews from '../components/news/RelatedNews';
import RecentNews from '../components/news/RecentNews';

const NewsBySlug = () => {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [relateNews, setRelateNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
        const data = await res.json();
        setNews(data.news);
        setRelateNews(data.relateNews || []);
      } catch (err) {
        console.error('Error fetching news details:', err);
      }
    };

    if (slug) fetchNewsDetails();
  }, [slug]);

  if (!news) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="sports" two={news?.title?.slice(0, 30)} />
        </div>
      </div>

      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            {/* Left Main Section */}
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white">
                  <img src={news?.image} alt="" />
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">{news?.category}</h3>
                    <h2 className="text-3xl text-gray-700 font-bold">{news?.title}</h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span>{news?.date} /</span>
                      <span>{news?.writerName}</span>
                    </div>
                    <p>{htmlParser(news?.description)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
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

          {/* Related News Section */}
          <div className="pt-8">
            <RelatedNews news={relateNews} type="Related news" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsBySlug;
