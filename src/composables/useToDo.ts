import { get, post, HTTP_STATUS } from '@/utils/api';
import { generateId } from '@/utils/id';

const STATUS = ['todo', 'in progress', 'done'] as const;
export type ToDo = {
  id: number;
  title: string;
  description: string;
  status: (typeof STATUS)[number];
  createdAt: Date;
  finishedAt: Date | null;
  willFinishAt: Date | null;
};

export const getToDo = async (id: ToDo['id']): Promise<ToDo> => {
  const result = await get(`/todos/${id}`);
  if (result.status !== HTTP_STATUS.OK) {
    throw new Error('Failed to fetch todo');
  }

  return result.data as ToDo;
};

export type PostToDoArgs = Partial<Pick<ToDo, 'title' | 'description' | 'willFinishAt'>>;
export const postToDo = async (newToDo: PostToDoArgs): Promise<ToDo> => {
  const id = generateId();
  const baseToDo: ToDo = {
    id,
    title: '',
    description: '',
    status: 'todo',
    createdAt: new Date(),
    finishedAt: null,
    willFinishAt: null,
  };

  // TODO: エラーハンドリングとか
  const { data: todo } = await post(`/todos/${id}`, {
    ...baseToDo,
    ...newToDo,
  });
  return todo as ToDo;
};

export const useToDo = () => {
  return {
    getToDo,
    postToDo,
  };
}
