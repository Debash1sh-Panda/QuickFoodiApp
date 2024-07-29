import React from "react";

const categoryItems = [
  {
    id: 1,
    image: "/images/home/category/img1.png",
    title: "Main Dish",
    des: "(83 dishes)",
  },
  {
    id: 2,
    image: "/images/home/category/img2.png",
    title: "Break Fast",
    des: "(16 dishes)",
  },
  {
    id: 3,
    image: "/images/home/category/img3.png",
    title: "Dessert",
    des: "(39 dishes)",
  },
  {
    id: 4,
    image: "/images/home/category/img4.png",
    title: "Browse All",
    des: "(256 items)",
  },
];

const Categories = () => {
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle"> Customer Favorities</p>
        <h2 className="title">Popular Categories</h2>
      </div>

      {/* Categories cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoryItems.map((item) => (
          <div key={item.id} className="shadow-lg rounded-md text-[#000] p-5 py-6 w-72 mx-auto test-center cursor-pointer hover:-translate-y-4 duration-300 transition-all">
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                className="bg-slate-500 p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1 flex w-full mx-auto items-center justify-center flex-col">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;


