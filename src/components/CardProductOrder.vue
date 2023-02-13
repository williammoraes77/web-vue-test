<template>
  <div class="item-card">
    <h3>{{ description }}</h3>
    <h3 class="title-md">{{ amount }} x {{ price }}</h3>
    <h3 class="title-lg">R${{ subTotal }}</h3>
  </div>
</template>

<script>
export default {
  name: "CardProductOrder",
  props: {
    description: String,
    amount: String,
    price: String,
    subTotal: String,
  },
};
</script>

<style scoped>
.item-card {
  margin: 10px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary-light);
  border-radius: 10px;
  padding: 10px;
}

.title-md {
  font-size: 16px;
  color: var(--color-text-light);
}

.title-lg {
  font-size: 16px;
  color: var(--color-success);
}
</style>
