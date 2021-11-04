import { computed, ref } from 'vue';
// computed, ref 都不依赖上下文

export default function useTodo() {
  let title = ref('');
  let todos = ref([{ title: '学习 vue', done: false }]);
  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = '';
  }

  const active = computed(() => {
    return todos.value.filter((item) => item.done).length;
  });
  const all = computed(() => {
    return todos.value.length;
  });

  // // 只有直接修改 allDone 的值时 才会触发set方法
  // 当 active 或者 all 修改时触发get。
  // 因为 active 和 all 改变导致的 allDone 修改并不会触发 set
  let allDone = computed({
    get() {
      console.log('get');
      return active.value === all.value;
    },
    set(value: boolean) {
      console.log('set');
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });

  return { title, todos, addTodo, active, all, allDone };
}
