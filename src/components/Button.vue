<template>
  <button :class="type">
    <div class="title-button" v-if="type == 'primary'">{{ title }}</div>
    <img class="icon" :src="icon" alt="" />
  </button>
</template>

<script>
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
  border-radius: 8px;
}

.success {
  background-color: var(--color-success);
  border-radius: 8px;
}

.danger {
  background-color: var(--color-danger);
  border-radius: 8px;
}

.primary {
  background-color: var(--color-primary);
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  margin-right: 20px;
}

.icon {
  width: 15px;
  height: 15px;
}

.title-button {
  margin-right: 10px;
}
</style>
