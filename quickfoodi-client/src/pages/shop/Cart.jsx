import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function Cart() {
  const [cart, refetch] = useCart();
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([]);


  //total price for individual item
  const totalPrice = (item) => {
    return item.price * item.quantity;
  }

  //total price for all item
  const calculateTotalAmount = cart.reduce((total, item) => {
    return total + totalPrice(item);
  }, 0)


  //increase quantity
  const handleIncrease = (item) => {
    fetch(`http://localhost:3001/api/cart/${item._id}`,{
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({quantity: item.quantity + 1})
    })
    .then( res => res.json())
    .then( data => {
      const updateCart = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1
          }
        }
       return cartItem; 
      })
      
      setCartItems(updateCart);
      refetch();
    })
  };


  //decrease quantity
  const handleDecrease = (item) => {
    fetch(`http://localhost:3001/api/cart/${item._id}`,{
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ quantity: Math.max(item.quantity - 1, 1) })
    })
    .then( res => res.json())
    .then( data => {
      const updateCart = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
            ...cartItem,
            quantity: Math.max(cartItem.quantity - 1, 1)
          }
        }
       return cartItem; 
      })
      
      setCartItems(updateCart);
      refetch();
    })
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/api/cart/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  
  return (
    <div className="section-container bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%">
      {/* text */}
      <div className="py-32 flex flex-col justify-between items-center gap-8">
        <div className="flex items-center justify-center space-y-7 px-3 order-2 md:order-1">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Items Added to The{" "}
            <span className="text-[#164A41] font-bold">CART</span>
          </h2>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#F1B24A] text-black rounded-md">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                  <button
                    className="btn btn-xs text-red-500"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="w-10 mx-2 text-center overflow-hidden appearance-none text-[#dccf1a]"
                  />
                  <button
                    className="btn btn-xs text-green-500"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td className="text-black">₹{totalPrice(item).toFixed(2)}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs text-black hover:text-red-800 hover:bg-slate-500"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* customer details */}
      <div className="my-12 flex flex-col md:flex-row">
        <div className="md:w-1/2 space-y-3 relative">
          <h3 className="text-[#dccf1a] font-bold">Customer Details</h3>
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="User avatar" src={user.photoURL} />
              ) : (
                <img
                  alt="Default avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
          <p className="absolute top-9 px-14">
            Name: <span className="text-black">{user.displayName}</span>
          </p>
          <p>
            Email: <span className="text-black">{user.email}</span>
          </p>
          <p>
            User_id: <span className="text-black">{user.uid}</span>
          </p>
        </div>

        <div className="md:w-1/2 space-y-3 flex flex-col justify-end  items-end">
          <h3 className="text-[#123a34] font-bold">Shopping Details</h3>
          <p className=" text-black">
            Total Items:{" "}
            <span className="text-black font-bold">{cart.length}</span>
          </p>
          <p className="text-black">
            Total Price: <span className="text-[#102929] font-bold">₹{calculateTotalAmount.toFixed(2)}</span>
          </p>
          <button className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2">
            Proceed Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
