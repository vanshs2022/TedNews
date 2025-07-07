import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?value=${encodeURIComponent(state)}`);
    setState("");
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={search} className="flex">
        <div className="w-[calc(100%-45px)] h-[45px]">
          <input
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full h-full p-2 border border-slate-300 outline-none bg-slate-100"
            placeholder="Search..."
          />
        </div>
        <button
          type="submit"
          className="w-[45px] outline-none h-[45px] flex justify-center items-center text-white text-xl"
          style={{ backgroundColor: "#4c9150" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3e7742")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4c9150")}
        >
          <AiOutlineSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
