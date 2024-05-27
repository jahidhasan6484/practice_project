/* eslint-disable no-unused-vars */

import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogin from "../auth/GoogleLogin";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const userInfo = useAuthState(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      toast.error("Invalid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimum length is 6");
      return;
    }

    createUserWithEmailAndPassword(email, password);
  };

  if (user) {
    toast.success("Successfully creating a new account");
  }

  if (error) {
    toast.error(error?.message);
  }

  useEffect(() => {
    if (userInfo[0]) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="hero-content grid lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Register to explore the biggest online tech market in the world and
            be our member.
          </p>
          <img src="" alt="" />
        </div>
        <div className="flex justify-end">
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value={`${loading ? "Creating account" : "Register"}`}
                  className="btn btn-primary"
                  disabled={loading}
                />
              </div>

              <p className="text-center">
                Already have a account ?{" "}
                <Link to={"/login"} className="text-black">
                  Login here
                </Link>
              </p>
            </form>
            <div className="  w-full ">
              <div className="flex flex-col gap-2 mx-7 mb-7">
                <GoogleLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
