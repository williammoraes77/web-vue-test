<template>
  <button :class="type">
    <div v-if="type == 'primary'">Criar</div>
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
}

.success {
  background-color: var(--color-success);
}

.danger {
  background-color: var(--color-danger);
}

.primary {
  background-color: var(--color-primary);
  display: flex;
  padding: 10px 20px;
  justify-content: space-between;
  margin-right: 20px;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
