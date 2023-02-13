<template>
  <main>
    <div class="home-items">
      <CardHome title="Pedidos" :route="orderRoute" :icon="orderIcon" />

      <CardHome title="Clientes" :route="clientsRoute" :icon="clientsIcon" />

      <CardHome title="Produtos" :route="productsRoute" :icon="productsIcon" />
    </div>
  </main>
</template>

<script>
import CardHome from "@/components/CardHome.vue";
export default {
  name: "HomeView",
  components: { CardHome },
  data() {
    return {
      orderRoute: "/pedidos",
      orderIcon: "/img/orders.png",
      clientsRoute: "/pessoas",
      clientsIcon: "/img/user.png",
      productsRoute: "/produtos",
      productsIcon: "/img/box.png",
    };
  },
};
</script>

<style scoped>
main {
  background-color: var(--color-background);
  align-items: center;
}

.home-items {
  width: 100%;
  padding: 0 40px;
}

@media (min-width: 700px) {
  .home-items {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
  }
}
</style>
