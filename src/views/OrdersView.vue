<template>
  <main>
    <h1>Pedidos</h1>
    <section class="container">
      <div class="father">
        <div class="card">
          <div class="title-content">
            <h2 class="order_id">#1</h2>
            <div class="order_actions">
              <div class="button-content">
                <Button title="Editar" type="success" :icon="icon_edit" />
              </div>
              <div class="button-content">
                <Button title="Deletar" type="danger" :icon="icon_delete" />
              </div>
            </div>
          </div>
          <div class="data-conntent">
            <h3>Usuario</h3>
            <h3>15/10/1991</h3>
          </div>
          <div class="items-conntent">
            <div class="item-card">
              <h3>Item</h3>
              <h3>R$26,75</h3>
            </div>
          </div>
        </div>
        <div class="card">card 1</div>
        <div class="card">card 1</div>
      </div>
    </section>
  </main>
</template>

<script>
import api from "@/services/api";
import Button from "@/components/Button.vue";
export default {
  name: "OrdersView",
  components: { Button },
  data() {
    return {
      orders: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
      icon_plus: "/img/plus.png",
    };
  },
  mounted() {
    api.get("/pedidos").then((response) => {
      this.orders = response.data;
    });
  },
};
</script>

<style scoped>
main {
  align-items: center;
}

body {
  padding: 2em;
}

.container {
}

.father {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  flex: 1 1 350px;
  margin: 5px;
  border: 2px solid var(--color-primary);
  padding: 10px;
}

.title-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order_id {
}

.order_actions {
  display: flex;
}

.button-content {
  margin: 0 5px;
}

.data-conntent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid var(--color-text-light);
}

.data-conntent h3 {
  margin-top: 15px;
  font-size: 16px;
}

.items-conntent {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid var(--color-text-light);
}

.items-conntent h3 {
  font-size: 16px;
}

.item-card {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary-light);
  border-radius: 10px;
  padding: 10px;
}
</style>
