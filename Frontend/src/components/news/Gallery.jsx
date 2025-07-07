import React, { useEffect, useState } from 'react';
import { base_api_url } from '../../config/config';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${base_api_url}/api/images/news`);
        const data = await res.json();
        setImages(data.images || []);
      } catch (err) {
        console.error("Error fetching images:", err.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#000f3f] before:h-full before:-left-0 pl-3">
        Gallery
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images.map((item, i) => (
          <div key={i} className="w-full h-[85px] relative">
            <img
              className=""
              src={item.image}
              alt="images"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
