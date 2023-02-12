<template>
  <div :class="type">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    msg: String,
    type: String,
  },
};
</script>

<style scoped>
.card {
  color: #004085;
  background-color: green;
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
.danger {
  color: var(--color-text-light);
  background-color: var(--color-danger);
  border: 2px solid #b8daff;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>
