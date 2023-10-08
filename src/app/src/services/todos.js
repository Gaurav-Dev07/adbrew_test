import api from "../api";

export const getAllTodos = async () => {
  const todosResponse = await api.get("todos/");
  return todosResponse.data;
};

export const addTodo = async (title) => {
  const response = await api.post("todos/", { title: title });
  return response.status;
};
