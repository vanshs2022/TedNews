import React, { useEffect, useState } from 'react';
import Title from '../Title';
import NewsCard from './items/NewsCard';
import { base_api_url } from '../../config/config';

const RecentNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/recent/news`);
        const data = await res.json();
        setNews(data.news || []);
      } catch (error) {
        console.error("Error fetching recent news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
      <div className="pl-4">
        <Title title="Recent news" />
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {news.map((item, i) => (
          <NewsCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
