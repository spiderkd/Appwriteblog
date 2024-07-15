import Service from "../appwrite/config";
// import { Card } from "antd";
// import { ConfigProvider } from "antd";
import { Link } from "react-router-dom";
// import { BorderBeam } from "./magicui/border-beam";
import ShineBorder from "./magicui/shine-border";

// const { Meta } = Card;

function PostCard({ $id, title, status, featuredimage }) {
  return (
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Card: {
    //         extraColor: "#ffffff",
    //       },
    //     },
    //   }}
    // >
    <Link to={`/post/${$id}`}>
      <ShineBorder
        className="w-full relative border bg-black  p-1 inline-block min-h-[330px] shadow-md hover:shadow-gray-100 shadow-gray-900 duration-300"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        {/* <BorderBeam /> */}

        <div className="w-full justify-center mb-4 lg:h-[216px]">
          <img
            src={Service.getFilePreview(featuredimage)}
            alt={title}
            className="  h-[230px]  w-full object-cover hover:brightness-110"
          />
        </div>
        <div className="text-left px-3 pt-3">
          <button
            className={`flex items-center
					${status !== "active" ? "bg-red-50" : " bg-green-50 "}
					mb-2 px-3 py-[2px] rounded-full text-black text-left cursor-default`}
          >
            <div
              className={`${
                status !== "active" ? "bg-red-500" : "bg-green-500"
              } mr-2  rounded-full h-3 w-3 `}
            ></div>
            {status}
          </button>

          <h2 className="lg:text-2xl text-xl tracking-wider font-semibold text-gray-100 -4 truncate">
            {title}
          </h2>
        </div>
      </ShineBorder>

      {/* <Card
        hoverable={false}
        bordered={false}
        className="bg-bgblack border border-gray-400 hover:scale-101 text-white"
        cover={
          <img
            src={Service.getFilePreview(featuredimage)}
            alt={title}
            className="object-cover max-h-36 border border-gray-400"
          />
        }
      >
        <Meta
          className="text-xl font-bold text-white"
          style={{ color: "red" }}
          description={title}
        />
      </Card> */}
    </Link>
    // </ConfigProvider>
  );
}

export default PostCard;
