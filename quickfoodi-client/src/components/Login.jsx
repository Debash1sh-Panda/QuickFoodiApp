import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuth from "../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {login, signUpWithGmail, gitHubLogin} = useAuth();
  const [errorMessaage, setErrorMessage] = useState("");

  // redirecting to the home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
    .then( (result) => {
      const user = result.user;
      toast.success("Login Successfully :)");
      document.getElementById("my_modal_5").close();
      navigate(from, {replace: true})
    }).catch( (error) => {
      // toast.error(error.message);
      setErrorMessage("Provide a correct email or password !")
    })
  };

  // google signin
  const handleLogin = () => {
    signUpWithGmail().then( (result) => {
      const user = result.user;
      toast.success("Login Succesfully :)");
      navigate(from, {replace: true});
    }).catch( (error) => console.log(error));
  }

  const handleGitLogin = () => {
    gitHubLogin().then((result) => {
      const user = result.user;
      toast.success("Login Successfully :)");
      navigate(from, { replace: true });
    }).catch((error) => {
      console.error("Login error:", error);
      toast.error("Login failed :(");
    });
  };
  
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-lg text-center">
              Login <span className="text-[#6ae93d]">Now!</span>
            </h1>
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
            {
              errorMessaage ? <p className="text-xs italic text-red-400">{errorMessaage}</p> : ""
            }

            {/* Login button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-6 text-white flex items-center gap-2"
              />
            </div>
            <p className="text-center my-2">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-[#b0f098] ml-1">
                Signup Now
              </Link>
            </p>
            <button
              htmlFor = "my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle absolute right-2 top-2 hover:bg-[#d4bc94] hover:text-slate-900"
            >
              X
            </button>
          </form>

          <div className="text-center space-x-3 mb-4">
            <button
              className="btn btn-circle hover:bg-[#d4bc94] hover:text-slate-900"
              title="google"
              onClick={handleLogin}
            >
              <FaGoogle />
            </button>
            <button
              className="btn btn-circle hover:bg-[#d4bc94] hover:text-slate-900"
              title="facebook"
            >
              <FaFacebook />
            </button>
            <button
              className="btn btn-circle hover:bg-[#d4bc94] hover:text-slate-900"
              title="github"
              onClick={handleGitLogin}
            >
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Login
