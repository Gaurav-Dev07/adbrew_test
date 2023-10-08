import React, { useEffect, useState } from "react";
import TodoForm from "../../components/Todo";
import { addTodo, getAllTodos } from "../../services/todos";
import ErrorHandlerWrapper from "../../wrappers/ErrorHandlerWrapper";
import {
  LEARN_DOCKER,
  LEARN_REACT,
  LIST_OF_TODOS,
} from "../../core-utils/contants/constants";

const LandingPage = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [fetchTodosError, setFetchTodosError] = useState(false);
  const [addTodoError, setAddTodoError] = useState(false);

  const fetchTodos = async () => {
    try {
      const todos = await getAllTodos();
      setAllTodos(todos);
    } catch (error) {
      setFetchTodosError(true);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoClick = async () => {
    try {
      await addTodo(todo);
      setTodo("");
      fetchTodos();
    } catch (error) {
      setAddTodoError(addTodoError);
    }
  };

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

  const renderTodoList = () => {
    return (
      <>
        <div>
          {allTodos.length > 0 &&
            allTodos.map((todo) => <li key={todo._id}> {todo.title}</li>)}
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
      <h1>{LIST_OF_TODOS}</h1>
      <li>{LEARN_DOCKER}r</li>
      <li>{LEARN_REACT}</li>
      <ErrorHandlerWrapper error={fetchTodosError} render={renderTodoList} />
      <ErrorHandlerWrapper error={addTodoError} render={renderTodoForm} />
    </>
  );
};

export default LandingPage;
