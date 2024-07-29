import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from 'react-toastify';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUsers, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to the home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

      createUsers(email, password)
        .then((result) => {
          const user = result.user;
          toast.success("Signup successfully");
          navigate(from, {replace: true})
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error(error.message);
          setErrorMessage("all fields required")
        });
  };

  return (
    <div className="max-w-md shadow-md w-full relative mx-auto flex items-center justify-center my-20">
      <Link
        to="/"
        className="btn btn-sm btn-circle absolute top-0 right-1 hover:bg-[#d4bc94] hover:text-slate-900"
      >
        X
      </Link>
      <div className="modal-action mt-0 ">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-lg text-center">
            Create An <span className="text-[#6ae93d]">Account!</span>
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="full-name"
              className="input input-bordered"
              required
              {...register("text")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password")}
            />
            <label className="label mt-1">
              <a
                href="#"
                className="label-text-alt link link-hover text-red-200"
              >
                Forgot password?
              </a>
            </label>
          </div>
          {/* error message */}
          {errorMessage ? (
            <p className="text-xs italic text-red-400">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="SignUp"
              className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2"
            />
          </div>
          <p className="text-center my-2">
            If have an account?{" "}
            <button
              className="underline text-[#b0f098] ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login now!
            </button>
          </p>
        </form>
      </div>
      <Login />
    </div>
  );
}

export default SignUp;
