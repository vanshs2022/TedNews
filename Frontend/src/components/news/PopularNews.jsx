import React, { useEffect, useState } from 'react';
import Title from '../Title';
import SimpleDetailsNewCard from './items/SimpleDetailsNewCard';
import { base_api_url } from '../../config/config';

const PopularNews = ({ type }) => {
  const [popularNews, setPopularNews] = useState([]);

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/popular/news`);
        const data = await res.json();
        setPopularNews(data.popularNews || []);
      } catch (err) {
        console.error("Failed to fetch popular news:", err);
      }
    };

    fetchPopularNews();
  }, []);

  return (
    <div className='w-full pb-8 mt-5'>
      <div className='flex flex-col w-full gap-y-[14px]'>
        <Title title="Popular news" />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3'>
          {popularNews.slice(0, 4).map((item, i) => (
            <SimpleDetailsNewCard
              news={item}
              type={type}
              item={item}
              key={i}
              height={230}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularNews;
