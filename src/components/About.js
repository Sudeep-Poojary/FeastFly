import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent Compoenent Did Mount");
  }

  render() {
    // console.log("Parent Render");

    return (
      <div>
        <h1>About Us</h1>
        <h2>This is FeastFly</h2>
        <UserClass name={"First"} location={"Mumbai"} />
      </div>
    );
  }
}

export default About;
