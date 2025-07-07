import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ item }) => {
  return (
    <div className="bg-white shadow flex p-4">
      <div className="relative group overflow-hidden h-full">
        <div className="group-hover:scale-[1.1] transition-all duration-[1s] w-[100px] md:w-[160px] h-[93px] lg:w-[100px] relative">
          <img
            src={item?.image}
            alt="news"
            className="object-cover w-full h-full"
          />
          <div className="w-full h-full absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 w-[calc(100%-100px)] md:w-[calc(100%-160px)] lg:w-[calc(100%-100px)] pl-3">
        <Link to={`/news/category/${item?.category}`} className="text-sm font-semibold text-[#000f3f]">
          {item?.category}
        </Link>

        {/* ✅ Replaced ID-based link with item.url */}
        <Link
          to={item?.url}
          className="text-sm font-semibold text-[#333333] hover:text-[#000f3f]"
        >
          {item?.title}
        </Link>

        <div className="flex gap-x-2 text-xs font-normal text-slate-600">
          <span>{item?.date}</span>
          <span>{item?.writerName}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
