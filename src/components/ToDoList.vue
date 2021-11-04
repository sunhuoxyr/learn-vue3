<template>
  <h1 @click="add" class="font-color">{{ count }}</h1>
  <input type="text" v-model="title" @keydown.enter="addTodo" />
  <ul v-if="todos.length">
    <li v-for="todo in todos">
      <input type="checkbox" v-model="todo.done" />
      <span :class="{ done: todo.done }">{{ todo.title }}</span>
    </li>
  </ul>
  <div v-else>暂无数据</div>
  {{ allDone }}
  <div>全选 <input type="checkbox" v-model="allDone" /></div>
  <div>{{ active }} / {{ all }}</div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import useTodo from '../utils/useTodo';

const { title, todos, addTodo, active, all, allDone } = useTodo();

let count = ref(0);
let color = ref('#000');

function add() {
  count.value++;
  color.value = count.value >= 3 ? 'red' : '#000';
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
ul {
  text-align: left;
}
/* 通过 v-bind 直接使用 js 中的变量 */
.font-color {
  color: v-bind(color);
}
</style>
