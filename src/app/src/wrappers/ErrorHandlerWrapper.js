import React from "react";
import ErrorState from "../components/ErrorState";
import Loader from "../components/Loader";

const ErrorHandlerWrapper = ({ error, render, loading }) => {
  if (error) {
    return <ErrorState />;
  }
  else if(loading) {
    return <Loader />
  }
  return <>{render()}</>;
};

export default ErrorHandlerWrapper;
