import React from "react";
import { LEARN_DOCKER, LEARN_REACT, LIST_OF_TODOS } from "../../core-utils/contants/constants";

const TodosHeader = () => {
  return (
    <>
      <h1>{LIST_OF_TODOS}</h1>
      <li>{LEARN_DOCKER}r</li>
      <li>{LEARN_REACT}</li>
    </>
  );
};

export default TodosHeader;
