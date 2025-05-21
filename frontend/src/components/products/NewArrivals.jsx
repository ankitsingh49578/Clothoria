import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import axios from "axios";

const NewArrivals = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            className={`custom-swiper-prev p-2 rounded border bg-white text-black cursor-pointer ${
              isBeginning ? "opacity-50 cursor-not-allowed" : "bg-white shadow"
            }`}
          >
            <FiChevronLeft className="text-2xl " />
          </button>
          <button
            className={`custom-swiper-next p-2 rounded border bg-white text-black cursor-pointer ${
              isEnd ? "opacity-50 cursor-not-allowed" : "bg-white shadow"
            }`}
          >
            <FiChevronRight className="text-2xl " />
          </button>
        </div>
      </div>

      {/* scrollable content */}
      <div className="container mx-auto">
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
          grabCursor={true}
          keyboard={{
            enabled: true,
          }}
          onSwiper={(swiper) => {
            (swiperRef.current = swiper),
              setIsBeginning(swiper.isBeginning),
              setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            468: {
              slidesPerView: 2,
            },
            769: {
              slidesPerView: 3,
              // slidesPerGroup: 2,
            },
            1324: {
              slidesPerView: 4,
            },
          }}
          scrollbar={true}
          navigation={{
            prevEl: ".custom-swiper-prev",
            nextEl: ".custom-swiper-next",
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Scrollbar, Navigation, Pagination]}
          className="mySwiper"
        >
          <div className="container mx-auto overflow-x-scroll flex space-x-6 relative">
            {newArrivals.map((product) => (
              <SwiperSlide>
                <div
                  key={product._id}
                  className="w-[90%] mx-auto text-center relative"
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.images[0]?.altText || product.name}
                    className="w-full h-[400px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 opacity-70 backdrop-blur-md text-white p-4 rounded-b-lg">
                    <Link to={`/product/${product._id}`} className="block">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="mt-1">{product.price}</p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
