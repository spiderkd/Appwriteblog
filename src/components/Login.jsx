import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
// import Meteors from "./magicui/meteors";
import { ButtonUI } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Spline from "@splinetool/react-spline";
// import Yoursvg from "../lib/login.svg";
// import vid from "../lib/vid.mp4";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    // <>
    //   <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[200px]">
    //     <div className="hidden bg-[#2d2d2d] lg:block ">
    //       {/* <img
    //         src={Yoursvg}
    //         width="1920"
    //         height="980"
    //         className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
    //       /> */}
    //       <video src={vid} autoPlay loop />
    //     </div>
    //     {/* <Spline scene="https://prod.spline.design/Z1gVcuu61LQ65DbN/scene.splinecode" /> */}
    //     <div className="flex items-center justify-center py-12">
    //       <div className="mx-auto grid w-[350px] gap-6">
    //         <div className="grid gap-2 text-center">
    //           <h1 className="text-3xl font-bold text-white">Login</h1>
    //           <p className="text-balance text-muted-foreground text-white">
    //             Enter your email below to login to your account
    //           </p>
    //         </div>
    //         <form onSubmit={handleSubmit(login)} className="">
    //           <div className="grid gap-5">
    //             <div className="grid gap-2">
    //               <Label
    //                 htmlFor="password  "
    //                 className="text-white flex items-start"
    //               >
    //                 Email
    //               </Label>
    //               <Input
    //                 label="Email: "
    //                 placeholder="Enter your email"
    //                 type="email"
    //                 className="text-zinc-500 "
    //                 {...register("email", {
    //                   required: true,
    //                   validate: {
    //                     matchPatern: (value) =>
    //                       /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
    //                         value
    //                       ) || "Email address must be a valid address",
    //                   },
    //                 })}
    //               />
    //             </div>
    //             <div className="grid gap-2">
    //               <div className="flex items-center">
    //                 <Label
    //                   htmlFor="password"
    //                   className="text-white flex items-start"
    //                 >
    //                   Password
    //                 </Label>
    //               </div>
    //               <Input
    //                 label="Password: "
    //                 type="password"
    //                 className="text-zinc-500"
    //                 placeholder="Enter your password"
    //                 {...register("password", {
    //                   required: true,
    //                 })}
    //               />
    //             </div>
    //             <ButtonUI
    //               type="submit"
    //               variant="outline_auth"
    //               className="w-full  bg-white
    //           "
    //             >
    //               Login
    //             </ButtonUI>
    //             {error && (
    //               <p className="text-red-600 mt-8 text-center">{error}</p>
    //             )}
    //           </div>
    //         </form>{" "}
    //         <div className="text-white text-center text-sm mt-4">
    //           Don&apos;t have an account?{" "}
    //           <Link to="/signup" className="underline">
    //             Sign up
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    // <div className="flex items-center justify-center w-full min-h-[calc(100vh-200px)] p-3 sm:p-0 mt-3 sm:mt-0 mb-10">
    //   <Meteors number={37} />
    //   <div
    //     className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10  border-black/10 sm:p-9 sm:pb-12 pb-11 shadow-2xl border-2`}
    //   >
    //     <div className="mb-2 flex justify-center">
    //       <span className="inline-block w-full max-w-[100px]">
    //         <Logo width="100%" />
    //       </span>
    //     </div>
    //     <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
    //       Sign in to your account
    //     </h2>
    //     <p className="mt-2 sm:mt-1 text-center text-sm sm:text-md text-black/60">
    //       Don&apos;t have any account?&nbsp;
    //       <Link
    //         to="/signup"
    //         className="font-medium text-primary transition-all duration-200 hover:underline"
    //       >
    //         Sign Up
    //       </Link>
    //     </p>
    //     {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    //     <form onSubmit={handleSubmit(login)} className="mt-8 sm:mt-6">
    //       <div className="space-y-5">
    //         <Input
    //           label="Email: "
    //           placeholder="Enter your email"
    //           type="email"
    //           {...register("email", {
    //             required: true,
    //             validate: {
    //               matchPatern: (value) =>
    //                 /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //                 "Email address must be a valid address",
    //             },
    //           })}
    //         />
    //         <Input
    //           label="Password: "
    //           type="password"
    //           placeholder="Enter your password"
    //           {...register("password", {
    //             required: true,
    //           })}
    //         />
    //         <Button type="submit" className="w-full">
    //           Sign in
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <>
      <div className="flex items-center justify-center w-full min-h-[calc(100vh-100px)] p-3 sm:p-0 mt-7 sm:mt-0 mb-10">
        <div className="overflow-hidden max-sm:hidden max-lg:hidden ">
          {/* <Meteors number={50} /> */}
        </div>
        <Card className="w-full max-w-sm z-10 rounded-[9px] bg-[#111]">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-start">
              Login
            </CardTitle>
            <CardDescription className="text-zinc-400 flex items-start">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(login)} className="">
            <div className="">
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-white flex items-start"
                  >
                    Email
                  </Label>
                  <Input
                    label="Email: "
                    placeholder="abc@gmail.com"
                    type="email"
                    className="text-zinc-500 rounded-[9px]"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) =>
                          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            value
                          ) || "Email address must be a valid address",
                      },
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="password  "
                    className="text-white flex items-start"
                  >
                    Password
                  </Label>
                  <Input
                    label="Password: "
                    type="password"
                    className="text-zinc-500 rounded-[9px]"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <ButtonUI
                  variant="outline_auth"
                  className="w-full rounded-[9px] bg-white"
                >
                  Sign in
                </ButtonUI>
                {error && (
                  <p className="text-red-600 mt-8 text-center">{error}</p>
                )}
              </CardFooter>
              <CardFooter className="flex justify-center items-center">
                <p className="mt-2 sm:mt-1 items-center text-center text-sm sm:text-md text-zinc-400">
                  Don&apos;t have any account?&nbsp;
                  <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline s"
                  >
                    Sign Up
                  </Link>
                </p>
              </CardFooter>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Login;
