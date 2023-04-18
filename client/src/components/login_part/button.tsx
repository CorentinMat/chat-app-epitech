import React from "react";

function Button() {
  const handleClick = (e: any) => {
    console.log(" test loggin page button");
  };
  return (
    <div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Button;
