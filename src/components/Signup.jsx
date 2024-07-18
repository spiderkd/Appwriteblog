import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// import Meteors from "./magicui/meteors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonUI } from "@/components/ui/button";
import Yoursvg from "../lib/signup.svg";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[200px]">
        <div className="hidden bg-[#2d2d2d] lg:block ">
          <img
            src={Yoursvg}
            width="1920"
            height="980"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold text-white">Sign up</h1>
              <p className="text-balance text-muted-foreground text-white">
                Enter your credentials to create your account
              </p>
            </div>

            <form onSubmit={handleSubmit(create)}>
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="text-white flex items-start"
                  >
                    Username
                  </Label>
                  <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    className="text-zinc-500"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="" className="text-white flex items-start">
                    Email
                  </Label>
                  <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    className="text-zinc-500"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid Email address",
                      },
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="text-white flex items-start"
                  >
                    Password
                  </Label>
                  <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    className="text-zinc-500"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
                <ButtonUI
                  type="submit"
                  variant="outline_auth"
                  className="w-full  bg-white
              "
                >
                  Create Account
                </ButtonUI>
                {error && (
                  <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <p className="mt-2 text-center text-base underline text-white">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="font-normal text-primary transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
