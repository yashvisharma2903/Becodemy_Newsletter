import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen grid place-items-center">
      <div>
        <h5>Congratulation you subscribed successfully!</h5>
        <span className="text-blue-400 underline">
          <a href="/">Redirect to home page...</a>
        </span>
      </div>
    </div>
  );
};

export default Page;
