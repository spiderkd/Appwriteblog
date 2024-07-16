import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { ButtonUI } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };
  if (!post) {
    return (
      <div className="bg-black/10 w-full h-screen text-6xl text-gray-200">
        Loading...
      </div>
    );
  }
  return post ? (
    <div className="py-8 ">
      <Container>
        <div className="w-full  mb-6"></div>
        <div className="grid grid-cols-3 ">
          <div className="w-full flex  justify-center mb-4 relative  rounded-xl p-2 ">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl object-scale-down outline outline-1 outline-offset-0 outline-gray-400 max-h-96 min-h-[21rem] max-w-96 min-w-52	"
            />
          </div>

          <div className="browser-css col-span-2 text-white ">
            <h1 className="text-2xl font-bold text-white pb-4">{post.title}</h1>
            {parse(post.content)}
          </div>
        </div>
        {isAuthor && (
          <div className="m-auto pt-4 ">
            <Link to={`/edit-post/${post.$id}`}>
              <ButtonUI variant="outline" className="mr-3  bg-green-500 ">
                <FaEdit className="mr-2 h-4 w-4" />
                Edit
              </ButtonUI>
            </Link>
            <ButtonUI
              variant="outline2"
              className="bg-red-500 ml-2"
              onClick={deletePost}
            >
              <MdDelete className="mr-2 h-4 w-4" />
              Delete
            </ButtonUI>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}
