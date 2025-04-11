import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

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
      <div className="m-5 p-5 content-center justify-items-center">
        <h1 className="text-2xl font-bold ">About Us</h1>
        <h2 className="my-4 text-xl font-bold">This is FeastFly</h2>

        {/* Made use of context below in Class Based Component (CBC) as Hooks don't work in CBC */}
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h1 className="text-xl font-bold">LoggedIn User: {loggedInUser}</h1>
          )}
        </UserContext.Consumer>
        <UserClass name={"First"} location={"Mumbai"} />
      </div>
    );
  }
}

export default About;
