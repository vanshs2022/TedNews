import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Category from "./Category";
import { FaFacebookF } from "react-icons/fa";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import ted from "../assets/ted.png";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-[#354782] to-[#000f3f]">
        <div className="flex justify-between items-center px-4 md:px-8 py-10 w-full gap-12">
          <div className="w-full">
            <div className="w-full flex flex-col gap-y-[14px]">
              <img
                className=""
                width={200}
                height={100}
                src={logo}
                alt="logo"
              />
              {/* <h2 className="text-slate-300">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </h2>
              <h2 className="text-slate-300">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur.
              </h2> */}
              <div>
                <Category categories={[]} titleStyle="text-white" />
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={ted} alt="Logo" className="h-[300px] w-auto" />
          </div>
          {/* <RecentNewsFooter /> */}
        </div>
      </div>
      <div className="bg-[#262323]">
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex gap-y-2 text-gray-400 justify-start items-center">
            <span>Copyright © 2025 | Team TedNews</span>
          </div>
          <div className="flex gap-x-[4px]">
            <a
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-[#ffffff2b]"
              href="https://www.facebook.com" target='_blank'
            >
              <FaFacebookF />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
              href="https://www.x.com" target='_blank'
            >
              <AiOutlineTwitter />
            </a>
            <a
              className="w-[37px] text-white h-[35px] flex justify-center items-center bg-[#ffffff2b]"
              href="https://www.youtube.com" target='_blank'
            >
              <AiFillYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
