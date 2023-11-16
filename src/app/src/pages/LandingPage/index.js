import React from "react";
import TodoForm from "../../components/TodoForm";
import ErrorHandlerWrapper from "../../wrappers/ErrorHandlerWrapper";
import TodosHeader from "../../components/TodosHeader";
import { useLandingPageState } from "./hooks";

const LandingPage = () => {
  const {
    todo,
    addTodoError,
    todos,
    todosError,
    todosLoading,
    handleTodoChange,
    addTodoClick,
  } = useLandingPageState()

  const renderTodoList = () => {
    return (
      <>
        <div>
          {todos.length > 0 &&
            todos.map((todo) => <li key={todo._id}> {todo.title}</li>)}
        </div>
      </>
    );
  };

  const renderTodoForm = () => {
    return (
      <>
        <TodoForm
          todo={todo}
          handleClick={addTodoClick}
          handleChange={handleTodoChange}
        />
      </>
    );
  };

  return (
    <>
      <TodosHeader />
      <ErrorHandlerWrapper
        error={todosError}
        loading={todosLoading}
        render={renderTodoList}
      />
      <ErrorHandlerWrapper error={addTodoError} render={renderTodoForm} />
    </>
  );
};

export default LandingPage;
