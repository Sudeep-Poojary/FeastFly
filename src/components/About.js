import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <h2>This is FeastFly</h2>
      {/* <User name={"Sudeep Poojary (Function)"} /> */}
      <UserClass name={"Sudeep Poojary (Class)"} />
    </div>
  );
};

export default About;
