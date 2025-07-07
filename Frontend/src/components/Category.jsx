import React from "react";
import { Link } from "react-router-dom";

const fixedCategories = [
  { category: "sports", label: "Sports" },
  { category: "education", label: "Education" },
  { category: "technology", label: "Technology" },
  { category: "international", label: "International" },
  { category: "health", label: "Health" },
];

const Category = ({ titleStyle }) => {
  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div
        className={`text-xl font-bold ${titleStyle} relative before:absolute before:w-[4px] before:bg-[#000f3f] before:h-full before:-left-0 pl-3`}
      >
        Category
      </div>
      <div
        className={`flex flex-col justify-start items-start text-sm gap-y-3 ${titleStyle} pt-3`}
      >
        {fixedCategories.map((item, i) => (
          <li className="list-none" key={i}>
            <Link to={`/news/category/${item.category}`}>
              {item.label}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Category;
