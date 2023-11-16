import { useState } from "react";
import { addTodo, getAllTodos } from "../../services/todos";
import { useApiData } from "../../customHooks/useApiData";

// local custom hook related to containing LandingPage State and data logic
export const useLandingPageState = () => {
  const [todo, setTodo] = useState("");
  const [addTodoError, setAddTodoError] = useState(false);

  const {
    data: todos,
    error: todosError,
    loading: todosLoading,
    fetchData,
  } = useApiData(getAllTodos);

  const handleTodoChange = (event) => {
    setTodo(event.target.value);
  };

  const addTodoClick = async () => {
    try {
      await addTodo(todo);
      setTodo("");
      fetchData();
    } catch (error) {
      setAddTodoError(true);
    }
  };

  return {
    todo,
    addTodoError,
    todos,
    todosError,
    todosLoading,
    handleTodoChange,
    addTodoClick,
  }
};
