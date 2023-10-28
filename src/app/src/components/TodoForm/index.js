import React from "react";
import { ADD_TODO, CREATE_TODO, TODO_HEADING } from "../../core-utils/contants/constants";

const TodoForm = ({ todo, handleClick, handleChange }) => {
  return (
    <div>
      <h1>{CREATE_TODO}</h1>
      <form>
        <div>
          <label htmlFor="todo">{TODO_HEADING}</label>
          <input type="text" value={todo} onChange={handleChange} />
        </div>
        <div style={{ marginTop: "5px" }}>
          <button type="button" onClick={handleClick}>
            {ADD_TODO}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
