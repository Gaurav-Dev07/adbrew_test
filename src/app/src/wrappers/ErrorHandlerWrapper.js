import React from "react";
import ErrorState from "../components/ErrorState";

const ErrorHandlerWrapper = ({ error, render }) => {
  if (error) {
    return <ErrorState />;
  }
  return <>{render()}</>;
};

export default ErrorHandlerWrapper;
