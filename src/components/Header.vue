<template>
  <header>
    <nav class="container">
      <router-link to="/">
        <img id="logo" src="/img/logo.png" alt="logo" />
      </router-link>

      <img
        v-on:click="openMenu"
        src="/img/menu-icon.png"
        alt="Open menu"
        id="menu-button"
      />

      <div v-on:click="closeMenu" id="menu-overlay" v-if="menuActive"></div>

      <div id="menu-items" :class="{ active: menuActive }">
        <img src="/img/logo.png" alt="logo" id="menu-logo" />
        <ul>
          <li v-on:click="closeMenu"><router-link to="/">Home</router-link></li>
          <li v-on:click="closeMenu">
            <router-link to="/pedidos">Pedidos</router-link>
          </li>
          <li v-on:click="closeMenu">
            <router-link to="/pessoas">Clientes</router-link>
          </li>

          <li v-on:click="closeMenu">
            <router-link to="/produtos">Produtos</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    openMenu: function () {
      this.menuActive = true;
    },
    closeMenu: function () {
      this.menuActive = false;
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--color-background-nav);
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
}

#logo {
  width: 50px;
}

#menu-button {
  width: 30px;
}

#menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 40%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.8;
}

#menu-logo {
  width: 110px;
  margin-top: 30px;
  margin-bottom: 10px;
}

#menu-items {
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-background-nav);
  width: 60%;
  height: 100vh;
  display: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

#menu-items.active {
  display: flex;
}

ul {
  list-style: none;
  text-align: center;
  height: 60px;
  align-items: center;
}

ul li a {
  color: var(--color-background);
}

ul li {
  margin: 20px 0;
}

@media (min-width: 700px) {
  #menu-button,
  #menu-logo,
  #menu-overlay {
    display: none;
  }

  #menu-items {
    display: flex;
    position: static;
    height: 60px;
    width: auto;
  }
  ul {
    display: flex;
  }

  ul li {
    margin: 0;
    margin-left: 20px;
  }
}
</style>
