import Meteors from "@/components/magicui/meteors";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <Meteors number={36} />
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
