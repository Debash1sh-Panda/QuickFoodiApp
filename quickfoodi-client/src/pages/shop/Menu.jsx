import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { baseUrl } from "../../urls";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilterdItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOptions] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // loading data
  useEffect(() => {
    //fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/menu`);
        const data = await response.json();
        // console.log(data);

        setMenu(data);
        setFilterdItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    //call the func
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((items) => items.category === category);

    setFilterdItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all date
  const showAll = () => {
    setFilterdItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting based on A-z, Z-A, lowtoHigh, HightoLow pricing
  const handleSortChange = (option) => {
    setSortOptions(option);

    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }

    setFilterdItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%">
        {/* menu banner */}
        <div className="py-48 flex flex-col justify-center items-center gap-8">
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              {" "}
              For the Love of Delicious{" "}
              <span className="text-[#164A41] font-bold">FOOD</span>
            </h2>
            <p className="text-xl text-[#dfb166] md:w-4/5 mx-auto">
              Come with family and feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellens and more for a moderate cost
            </p>
            <button className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 py-3 mt-4 border-none font-semibold text-white rounded-full">
              Order now :)
            </button>
          </div>
        </div>

        {/* menu shop section */}
        <div>
          {/* filtering and sorting */}
          <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8 rounded-md">
            {/* all category btns */}
            <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
              <button
                onClick={showAll}
                className={
                  selectedCategory === "all"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                All
              </button>
              <button
                onClick={() => filterItems("salad")}
                className={
                  selectedCategory === "salad"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                Salad
              </button>
              <button
                onClick={() => filterItems("pizza")}
                className={
                  selectedCategory === "pizza"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                Pizza
              </button>
              <button
                onClick={() => filterItems("soup")}
                className={
                  selectedCategory === "soup"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                Soups
              </button>
              <button
                onClick={() => filterItems("dessert")}
                className={
                  selectedCategory === "dessert"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                Desserts
              </button>
              <button
                onClick={() => filterItems("drinks")}
                className={
                  selectedCategory === "drinks"
                    ? "active"
                    : "hover:bg-[#9DCBBD] hover:text-slate-800 p-1 rounded-md"
                }
              >
                Drinks
              </button>
            </div>

            {/* sorting filter */}
            <div className="flex justify-end mb-4 rounded-sm">
              <div className="bg-[#164A41] p-2 rounded-md">
                <FaFilter className="h-4 w-4 text-white" />
              </div>

              {/* sorting optons */}
              <select
                name="sort"
                id="sort"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortOption}
                className="bg-[#164A41] px-2 py-1 rounded-md"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">low-to-high</option>
                <option value="high-to-low">high-to-low</option>
              </select>
            </div>
          </div>

          {/* products card */}
          <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {currentItems
              .filter((item) => item._id) // Filter out items without _id
              .map((item) => (
                <Cards key={item._id} item={item} />
              ))}
          </div>
        </div>

        <div className="flex justify-center my-10 pb-3">
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? " bg-[#F1B24A] text-white"
                  : " bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
