import { Container, Signup as SignupComponent } from "../components";
// import Meteors from "@/components/magicui/meteors";

function Signup() {
  return (
    <div className="py-8">
      <Container>
        {/* <Meteors number={30} /> */}
        <SignupComponent />
      </Container>
    </div>
  );
}

export default Signup;
