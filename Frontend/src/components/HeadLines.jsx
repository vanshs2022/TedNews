import React from 'react';
import LoadingSpinner from 'react-spinners-components';
import Marquee from 'react-fast-marquee';

const HeadLines = ({ news }) => {
  return (
    <div className="bg-white shadow flex flex-wrap">
      {/* Left box: Headlines Title */}
      <div className="flex md:w-[170px] w-full bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30">
        <div className="md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1">
          <span>
            <LoadingSpinner type="Ripple" colors={['#800000', '#000f3f']} size="30px" />
          </span>
          <h2 className="text-[#333333] font-semibold text-lg">Headlines</h2>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="flex md:w-[calc(100%-170px)] w-full">
        <div className="flex w-full justify-start items-center">
          <Marquee>
            {Object.keys(news).length > 0 &&
              Object.keys(news).map((categoryKey) =>
                news[categoryKey].map((n, j) => (
                  <a
                    key={n.url || `${categoryKey}-${j}`}
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 block font-semibold hover:text-[#000f3f] pr-12 text-sm"
                  >
                    {n.title}
                  </a>
                ))
              )}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
