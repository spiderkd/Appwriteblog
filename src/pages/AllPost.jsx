import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import SparklesText from "@/components/magicui/sparkles-text";
import { Skeleton } from "@/components/ui/skeleton";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        const activePosts = posts.documents.filter(
          (post) => post.status === "active"
        );
        setPosts(activePosts);
      }
      setLoading(false);
    });
  }, []);

  //grid grid-cols-2 md:grid-cols-4 gap-4
  //grid gap-4

  return (
    <div className="w-full py-8">
      <SparklesText
        text={"ALL BLOGS"}
        className="block text-[#c2c3c6]  text-4xl max-sm:text-3xl tracking-wider mx-auto pb-8"
        sparklesCount={10}
        colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
      />

      <Container>
        <div className="grid grid-cols-4 gap-2 max-md:flex max-md:flex-wrap max-sm:grid-cols-1">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.$id}
                className="p-2 sm:w-1/2 min-h-[345px] w-full lg:w-1/3 xl:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
