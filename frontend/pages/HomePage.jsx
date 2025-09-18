import React from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  return (
    <div>
      <h1>home page</h1>
      <button onClick={() => toast.success("skses")}>click me</button>
    </div>
  );
};

export default HomePage;
