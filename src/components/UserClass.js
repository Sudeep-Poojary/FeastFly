import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };

    // console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    // console.log(this.props.name + "Child Component Did Mount");

    const data = await fetch("https://api.github.com/users/Sudeep-Poojary");

    const json = await data.json();

    // console.log(json);

    this.setState({
      userInfo: json,
    });
  }

  componentDidUpdate() {
    // console.log("Component Did Update");
  }

  componentWillUnmount() {
    // console.log("Component Will Unmount");
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    // console.log(this.props.name + "Child Render");

    return (
      <div className="m-4 p-4 content-center justify-items-center">
        <div className="justify-items-center p-10 bg-gray-200 rounded-2xl">
          <img src={avatar_url} className="rounded-2xl w-50 mb-10" />

          <div className="my-2">
            <h2>Name: {name}</h2>
            <h3>Location: {location}</h3>
            <h4>Contact: @Sudeep-Poojary</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default UserClass;
