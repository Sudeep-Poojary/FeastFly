import React from "react";
import ReactDOM from "react-dom/client";

// JSX or React Element

const heading = <h1 className="head">Namaste React 🚀 Using JSX</h1>;

// React Functional Component

const HeadingComponent = () => <h1>Namaste React Functional Component</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering React Element
// root.render(heading);

// Rendering React Functional Component
root.render(<HeadingComponent />);
