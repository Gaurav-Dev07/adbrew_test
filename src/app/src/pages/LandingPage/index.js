import React, { useState } from "react";
import TodoForm from "../../components/TodoForm";
import { addTodo, getAllTodos } from "../../services/todos";
import ErrorHandlerWrapper from "../../wrappers/ErrorHandlerWrapper";
import { useApiData } from "../../customHooks/useApiData";
import TodosHeader from "../../components/TodosHeader";

const LandingPage = () => {
  const {
    data: todos,
    error: todosError,
    loading: todosLoading,
    fetchData,
  } = useApiData(getAllTodos);

  const [todo, setTodo] = useState("");
  const [addTodoError, setAddTodoError] = useState(false);

  const addTodoClick = async () => {
    try {
      await addTodo(todo);
      setTodo("");
      fetchData();
    } catch (error) {
      setAddTodoError(true);
    }
  };

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

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
