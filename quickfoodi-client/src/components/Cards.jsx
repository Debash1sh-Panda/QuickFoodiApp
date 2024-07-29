import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

function Cards({ item }) {
  const { name, image, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  const handlerHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddtoCart = (item) => {
    // console.log(item)
    if (user && user.email) {
      // console.log("Item:", item);
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      // console.log(cartItem)
      fetch("http://localhost:3001/api/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.menuItemId) {
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              title: "Item Added Successfully",
              width: 600,
              padding: "1em",
              color: "#f0c684",
              background: "#fff",
              backdrop: `
                rgba(183, 235, 184, 0.4)
                 left top
                 no-repeat
                  `,
              timer: 2000,
            });
            refetch();
          }
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
        });
    } else {
        Swal.fire({
          title: "Have an Account!?",
          text: "Please create an Account or Login",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Signup Now :)l"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/signup', {state: {from: location}})
          }
        });
      console.log("User is not logged in or email is not available");
    }
  };
  return (
    <div className="card bg-base-100 w-full sm:w-96 shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-1 top-1 p-3 heartStar bg-[#3ae53d] ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handlerHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`} />
      <figure>
        <img
          className="hover:scale-105 transition-all duration-200 md:h-72"
          src={item.image}
          alt="Foods"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.recipe}</p>
        <div className="card-actions justify-end">
          <h5 className="font-semibold mr-40 mt-3">
            <span className="text-sm text-[#3ae53d]">₹</span>
            {item.price}
          </h5>
          <button
            className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-md text-white flex items-center hover:scale-105 transition-all duration-200"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
