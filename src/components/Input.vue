<template>
  <input :type="text" :placeholder="placeholder" v-model="teste" />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: String,
    placeholder: String,
    teste: string,
  },
};
</script>

<style scoped>
.search-content input {
  margin-right: 10px;
  border-radius: 10px;
  border: 2px solid var(--color-primary);
  height: 40px;
  color: var(--color-primary);
  font-size: 18px;
}
.search-content input::placeholder {
  color: var(--color-primary-light);
  font-size: 18px;
}
</style>
