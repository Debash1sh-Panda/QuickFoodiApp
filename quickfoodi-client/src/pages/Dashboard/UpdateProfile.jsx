import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";

function UpdateProfile() {
  
  const { updateUserProfile } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  
  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    // console.log(data)

    updateUserProfile(name, photoURL).then( () => {
        toast.success("Profile Updated Successfully : )");
        navigate(from, {replace: true});
    }).catch( (error) => {
        toast.error("Something Error try again")
    });
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h1>
            Update <span className="text-[#6ae93d]">Profile!</span>
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="@Debasish"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="text"
              placeholder="Enter photoURL"
              className="input input-bordered"
              {...register("photoURL")}
            />
            {/* todo = upload file will be later */}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
