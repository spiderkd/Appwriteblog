import { Link } from "react-router-dom";
import YourSvg from "../lib/NotFoundSign.svg";
import { ButtonUI } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="h-screen  flex flex-col items-center justify-start">
      <img src={YourSvg} className=" w-[26rem] h-[26rem]" />
      <div>
        <ButtonUI size="lg" asChild>
          <Link
            className="bg-amber-300  hover:bg-slate-200 rounded-xl mt-7"
            to={"/"}
          >
            Return to Home
          </Link>
        </ButtonUI>
      </div>
    </div>
  );
};

export default NotFound;
