<script setup lang="ts">
type Nullable<T> = T | null;
const status = ['todo', 'in progress', 'done'] as const;
interface ToDo {
  id: number;
  title: string;
  description: string;
  status: typeof status[number];
  createdAt: Date,
  finishedAt: Nullable<Date>,
  willFinishAt: Date,
};

const getDummyToDo = (overrideToDo: Partial<Omit<ToDo, 'id'>>): ToDo => {
  const defaultToDo: ToDo = {
    // for dummy
    id: Math.floor(Math.random() * 1000),
    title: '',
    description: '',
    status: 'todo',
    createdAt: new Date(),
    finishedAt: null,
    willFinishAt: new Date(),
  }
  return {
    ...defaultToDo,
    ...overrideToDo,
  };
};

let dummyToDos: ToDo[] = [];
for (let i = 0; i < 10; i++) {
  dummyToDos.push(getDummyToDo({
    title: `title ${i}`,
    description: `description ${i}`,
  }))
}
</script>

<template>
  <main>
    <h1>ToDo</h1>
    <section>
      <h2>ToDo List</h2>
      <ul>
        <!-- TODO: fix type error -->
        <li v-for="toDo in dummyToDos" :key="toDo.id">
          <h3>{{ toDo.title }}</h3>
          <p>{{ toDo.description }}</p>
          <p>Status: {{ toDo.status }}</p>
          <p>Created At: {{ toDo.createdAt }}</p>
          <p v-if="toDo.finishedAt">Finished At: {{ toDo.finishedAt }}</p>
          <p>Will Finish At: {{ toDo.willFinishAt }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>
