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
