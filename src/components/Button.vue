<template>
  <button :class="type">
    <img class="icon" :src="icon" alt="" />
  </button>
</template>

<script>
import editPng from "/public/img/edit.png";

export default {
  name: "Footer",
  props: {
    title: String,
    type: String,
    icon: String,
  },
};
</script>

<style scoped>
button {
  border: none;
  color: white;
  padding: 7px 7px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
}

.success {
  background-color: var(--color-success);
}

.danger {
  background-color: var(--color-danger);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
