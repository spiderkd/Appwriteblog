import Service from "../appwrite/config";
import { Card, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

function PostCard({ $id, title, featuredimage }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            extraColor: "#ffffff",
          },
        },
      }}
    >
      <Link to={`/post/${$id}`}>
        {/* <div className="w-full bg-gray-100 rounded-xl p-1 inline-block">
        <div className="w-full justify-center mb-4">
          <img
            src={Service.getFilePreview(featuredimage)}
            alt={title}
            className=""
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div> */}
        <Card
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
        </Card>
      </Link>
    </ConfigProvider>
  );
}

export default PostCard;
