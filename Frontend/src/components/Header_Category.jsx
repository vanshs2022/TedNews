import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { BsList } from "react-icons/bs";

const fixedCategories = [
  { category: "sports", label: "Sports" },
  { category: "education", label: "Education" },
  { category: "technology", label: "Technology" },
  { category: "international", label: "International" },
  { category: "health", label: "Health" },
];

const Header_Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [state, setState] = useState("");
  const [show, setShow] = useState(false);
  const [cateShow, setCateShow] = useState(false);

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?value=${state}`);
    setState("");
    setShow(false);
  };

  return (
    <div className="w-full">
      <div className="bg-[#000f3f] w-full text-white uppercase font-semibold relative">
        <div className="px-8 flex justify-between items-center relative h-[48px]">
          {/* Mobile category toggle */}
          <div
            onClick={() => setCateShow(!cateShow)}
            className={`text-3xl flex lg:hidden font-bold h-full w-[48px] cursor-pointer justify-center items-center ${
              cateShow ? "bg-[#00000026]" : ""
            } hover:bg-[#00000026]`}
          >
            <BsList />
          </div>

          {/* Desktop Nav */}
          <div className="flex-wrap hidden lg:flex">
            <Link
              className={`px-6 font-medium py-[13px] ${
                path === "/" ? "bg-[#00000026]" : ""
              }`}
              to="/"
            >
              Home
            </Link>
            {fixedCategories.map((c, i) => (
              <Link
                key={i}
                className={`px-6 font-medium py-[13px] ${
                  path === `/news/category/${c.category}`
                    ? "bg-[#00000026]"
                    : ""
                }`}
                to={`/news/category/${c.category}`}
              >
                {c.label}
              </Link>
            ))}
          </div>

          {/* Search Icon */}
          <div className="h-full w-[48px]">
            <div
              onClick={() => setShow(!show)}
              className={`text-xl ${
                show ? "bg-[#00000026]" : ""
              } font-bold h-full w-full cursor-pointer justify-center flex items-center hover:bg-[#00000026]`}
            >
              {show ? <IoClose /> : <AiOutlineSearch />}
            </div>

            {/* Search Box */}
            <div
              className={`absolute lg:block transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0 ${
                show ? "visible" : "invisible"
              }`}
            >
              <div className="p-3 bg-white">
                <form onSubmit={search} className="flex">
                  <div className="w-[calc(100%-45px)] h-[40px]">
                    <input
                      value={state}
                      required
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      placeholder="search"
                      className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-[45px] cursor-pointer h-[40px] flex justify-center outline-none items-center text-white text-xl"
                    style={{ backgroundColor: "#4c9150" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#3e7742")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#4c9150")
                    }
                  >
                    <AiOutlineSearch />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Categories */}
      {cateShow && (
        <div className="flex flex-wrap lg:hidden py-2 px-[30px]">
          <Link
            className={`px-4 font-medium py-[5px] ${
              path === "/" ? "bg-[#00000026]" : ""
            }`}
            to="/"
          >
            Home
          </Link>
          {fixedCategories.map((c, i) => (
            <Link
              key={i}
              className={`px-4 font-medium py-[5px] ${
                path === `/news/category/${c.category}` ? "bg-[#00000026]" : ""
              }`}
              to={`/news/category/${c.category}`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header_Category;
