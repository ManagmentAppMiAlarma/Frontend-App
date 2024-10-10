import React from "react";
import { PuffLoader } from "react-spinners";

const PuffLoaderComponent = ({ isLoading }) => {
  return (
    <div className="flex justify-center items-center min-h-[420px]">
      <PuffLoader color={"#dc2626"} loading={isLoading} size={50} />
    </div>
  );
};

export default PuffLoaderComponent;
