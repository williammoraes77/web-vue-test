<template>
  <main>
    <div class="home-items">
      <div class="item">
        <router-link to="/pedidos">
          <div class="card">
            <img src="/img/orders.png" alt="" />
            <h3>Pedidos</h3>
          </div>
        </router-link>
      </div>
      <div class="item">
        <router-link to="/pessoas">
          <div class="card">
            <img src="/img/user.png" alt="" />
            <h3>Clientes</h3>
          </div>
        </router-link>
      </div>

      <div class="item">
        <router-link to="/pedidos">
          <div class="card">
            <img src="/img/box.png" alt="" />
            <h3>Produtos</h3>
          </div>
        </router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--color-background);
  align-items: center;
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

.home-items {
  width: 100%;
  padding: 0 40px;
}
.item {
  margin: 40px 0;
}

@media (min-width: 700px) {
  .home-items {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
  }

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
