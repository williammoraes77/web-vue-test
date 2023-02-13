<template>
  <div class="item">
    <router-link :to="route">
      <div class="card">
        <img :src="icon" alt="" />
        <h3>{{ title }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardHome",
  props: {
    title: String,
    route: String,
    icon: String,
  },
};
</script>

<style scoped>
.home-items {
  width: 100%;
  padding: 0 40px;
}

.card {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-background-nav);
  border-radius: 16px;
}

.card img {
  width: 80px;
}

.item {
  margin: 40px 0;
}

@media (min-width: 700px) {
  .card {
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--color-background-nav);
    border-radius: 16px;
  }

  .item {
    margin: 0 30px;
  }
}
</style>
