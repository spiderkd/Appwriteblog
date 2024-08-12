import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FaBars } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#0C0C0C]">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="max-sm:hidden">
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `block  ${
                        isActive
                          ? "text-[#ffffff]  "
                          : "text-[#F6F5F5] text-opacity-85	"
                      } sm:pt-1 pt-1 sm:px-5 px-3 md:mr-4 duration-200 hover:underline text-xl`
                    }
                    // className="px-6 py-2 duration-200 hover:text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 rounded-full"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="max-sm:hidden">
                <LogoutBtn
                  className={
                    "px-4 py-1 text-[#F6F5F5] text-opacity-85 font-semibold text-xl  text-center  hover:underline "
                  }
                />
              </li>
            )}
            <Sheet>
              <SheetTrigger className="sm:hidden" asChild>
                <FaBars className="mr-2 mt-2 h-6 w-6 text-white " />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[240px] bg-[#000]/80 ">
                {/* <SheetHeader>
                  <SheetTitle> */}
                <SheetClose asChild>
                  <div className="m-auto flex items-center justify-center ">
                    <Link to="/" onClick={SheetClose}>
                      <Logo width="90px" />
                    </Link>
                  </div>
                  {/* </SheetTitle>
                </SheetHeader> */}
                </SheetClose>
                <Separator className="my-4 bg-gray-700   " />
                <div className="flex  flex-col justify-between overflow-y-auto">
                  <SheetClose asChild>
                    <section className=" flex h-full flex-col gap-6  pt-6 text-gray-500 text-xl">
                      {navItems.map((item) => {
                        return item.active ? (
                          <SheetClose asChild key={item.name}>
                            <NavLink
                              to={item.slug}
                              className={({ isActive }) =>
                                `block  ${
                                  isActive ? "text-[#ffffff]" : "text-gray-500"
                                } sm:pt-1 pt-1 sm:px-5 mx-auto px-9 md:mr-4 duration-200 hover:underline text-xl`
                              }
                            >
                              {item.name}
                            </NavLink>
                          </SheetClose>
                        ) : null;
                      })}
                    </section>
                  </SheetClose>
                </div>
                <SheetFooter asChild>
                  {authStatus && (
                    <div className="flex  justify-center items-end  ">
                      <LogoutBtn
                        className={
                          "px-4 mt-12 text-white font-semibold text-xl  text-center  hover:underline "
                        }
                      />
                    </div>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
