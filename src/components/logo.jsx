// import logo from "../logo-no-background.png";
import logoo from "../lib/log.svg";
function Logo({ width = "100px" }) {
  return (
    <div className="flex justify-center items-center">
      <img src={logoo} className="w-32 p-1 " alt="" />
    </div>
  );
}

export default Logo;
