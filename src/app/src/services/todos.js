import api from "../api";
import { todosUrl } from "../endpoints";

export const getAllTodos = async () => {
  const todosResponse = await api.get(todosUrl);
  return todosResponse.data;
};

export const addTodo = async (title) => {
  const response = await api.post(todosUrl, { title: title });
  return response.status;
};
