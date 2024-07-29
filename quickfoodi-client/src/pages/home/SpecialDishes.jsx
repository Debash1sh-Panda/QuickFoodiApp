import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#4D774E" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const BackArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#F1B24A" }}
      onClick={onClick}
    >
      PREV
    </div>
  );
};

function SpecialDishes() {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const Specials = data.filter((item) => item.category === "popular");
        setRecipes(Specials);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <BackArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 py-10 relative bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%">
      <div className="text-left">
        <p className="subtitle px-2">Special Dishes</p>
        <h2 className="title md:w-[526px]">
          Standout Dishes From Our{" "}
          <span className="text-[#164A41] font-bold">Menu</span>
        </h2>
      </div>

      <div className="md:absolute right-3 top-10 mt-3 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 border-none rounded-full ml-5 hover:bg-[#e6c38a] bg-[#ecb152] text-black"
        >
          <FaAngleLeft className="w-8 h-8 p-1" />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn p-2 border-none rounded-full ml-5 hover:bg-[#a0eba1] bg-[#51ea53] text-black"
        >
          <FaAngleRight className="w-8 h-8 p-1" />
        </button>
      </div>

      <div>
        <Slider ref={slider} {...settings} className="overflow-hidden mt-10 space-x-5">
          {recipes.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SpecialDishes;
