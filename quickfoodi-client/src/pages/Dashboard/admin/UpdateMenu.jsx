import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateMenu() {
  const item = useLoaderData();
//   console.log(item)

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = new FormData();
    imageFile.append('image', data.image[0]);
    
    try {
      const hostingImage = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (hostingImage.data.success) {
        const itemData = {
          name: data.recipename,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.details,
          image: hostingImage.data.data.display_url,
        };

        const postMenuItem = await axios.put(
          `http://localhost:3001/api/update-menu/${item.singleId._id}`,
          itemData
        );

        if (postMenuItem.status === 200) {
          toast.success("Item Updated successfully");
        }
        navigate("/dashboard/manage-item")
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Error while Updating Items, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-bold my-4">
        Update Your Menu <span className="text-[#4D774E] text-3xl">Items</span>
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-[#4d9f4e]">
                Recipe Name
              </span>
            </label>
            <input
              type="text"
              placeholder="#Recipe Name"
              defaultValue={item.singleId.name}
              className="input input-bordered input-warning w-full text-[#cee4ce]"
              {...register("recipename")}
            />
            {/* 2nd row */}
            <div className="flex items-center gap-3 mt-3 sm:mt-4">
              {/* category */}
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold text-[#4d9f4e]">
                    Category
                  </span>
                </label>
                <select
                  {...register("category")}
                  className="select select-warning w-full text-[#cee4ce]"
                  defaultValue={item.singleId.category}
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="Salad">Salad</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Soup">Soup</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="Popular">Popular</option>
                </select>
              </div>
              {/* price */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-[#4d9f4e]">
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="#price"
                  defaultValue={item.singleId.price}
                  className="input input-bordered input-warning w-full text-[#cee4ce]"
                  {...register("price")}
                />
              </div>
            </div>
            {/* 3rd row */}
            <div className="form-control w-full mt-4 sm:mt-8">
              <label className="label">
                <span className="label-text font-semibold text-[#4d9f4e]">
                  Recipe details
                </span>
              </label>
              <textarea
                className="textarea textarea-warning text-[#cee4ce]"
                defaultValue={item.singleId.recipe}
                placeholder="Tell the worlds about your recipe"
                {...register("details")}
              ></textarea>
            </div>
            {/* 4th row */}
            <div className="form-control w-full flex items-center mt-4 sm:mt-4">
              <label className="label">
                <span className="label-text font-semibold text-[#4d9f4e]">
                  Upload image
                </span>
              </label>
              <input
                type="file"
                // defaultValue={item.singleId.image}
                className="file-input file-input-warning w-full max-w-xs"
                {...register("image")}
              />
            </div>
            {/* 5th row */}
            <div className="form-control w-full flex items-center mt-4 sm:mt-6">
              {loading ? (
                <button className="btn btn-outline btn-success" type="submit">
                  <span className="loading loading-spinner text-warning"></span>
                  Updating
                </button>
              ) : (
                <button className="btn btn-outline btn-success" type="submit">
                  <FaUtensils /> UPDATE
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMenu;
