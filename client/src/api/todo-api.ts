import { Paging } from '@/models/paging';
import { Todo } from '@/models/todo';

export interface FetchTodosResponse {
  items: Todo[];
  meta: Paging;
}

const basePath = 'http://localhost:3000/api/v1';

export function fetchTodos(offset = 0): Promise<FetchTodosResponse> {
  const url = new URL(`${basePath}/todo`);
  const params = new URLSearchParams({ offset: offset.toString() });

  url.search = params.toString();

  return fetch(url.toString()).then((res) =>
    res.json()
  ) as Promise<FetchTodosResponse>;
}

export async function deleteTodo(todo: Todo): Promise<boolean> {
  const url = new URL(`${basePath}/todo/${todo._id}`);

  const res = await fetch(url.toString(), {
    method: 'DELETE',
  });

  return res.ok;
}

export function updateTodo(todo: Todo): Promise<Todo> {
  const url = new URL(`${basePath}/todo/${todo._id}`);

  return fetch(url.toString(), {
    method: 'PUT',
    body: JSON.stringify(todo),
  }).then((res) => res.json()) as Promise<Todo>;
}
