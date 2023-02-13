<template>
  <main>
    <section class="container">
      <div class="title-content">
        <h1>Produtos</h1>

        <Button
          title="Adicionar"
          type="primary"
          :icon="icon_plus"
          @click="isOpen = true"
        />
      </div>
      <dir class="search-content">
        <input
          type="text"
          v-model="search"
          placeholder="Digite a descriçao do produto"
        />
      </dir>

      <table class="table">
        <tr id="header-title">
          <th>ID</th>
          <th>Descricao</th>
          <th>Valor</th>
          <th>Açoes</th>
        </tr>
        <!-- <tr v-for="product in products" :key="product.id"> -->
        <tr v-for="product in filteredItems" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.descricao }}</td>
          <td>{{ product.valoUnitario }}</td>
          <td class="edit-buttons">
            <router-link
              :to="{ name: 'product_edit', params: { produto: product.id } }"
            >
              <Button title="Editar" type="success" :icon="icon_edit"
            /></router-link>

            <Button
              title="Deletar"
              type="danger"
              :icon="icon_delete"
              @click="deleteProduct(product.id)"
            />
          </td>
        </tr>
      </table>
    </section>
    <Message :msg="msg" v-show="msg" :type="msg_type" />
  </main>
  <Modal :open="isOpen" @close="isOpen = !isOpen" :closeBtn="true">
    <form id="form-product" method="POST" @submit="createProduct">
      <div class="input-container">
        <label for="input_description">Descriçao do produto:</label>
        <input
          type="text"
          id="input_description"
          name="description"
          v-model="description"
          placeholder="Digite a descricao"
          required
        />
      </div>
      <div class="input-container">
        <label for="price">Valor</label>
        <input
          type="number"
          step="0.01"
          min="0"
          id="price"
          name="valoUnitario"
          v-model="valoUnitario"
          placeholder="Digite o preço"
          required
        />
      </div>
      <Message :msg="msg_modal" v-show="msg_modal" :type="modal_type" />
      <div class="input-container">
        <input
          class="submit-btn"
          type="submit"
          value="Cadastrar!"
          id="submit-button"
          required
        />
      </div>
    </form>
  </Modal>
</template>

<script>
import api from "@/services/api";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import Message from "@/components/Message.vue";

import { ref } from "vue";

export default {
  name: "ProductsView",
  components: { Button, Modal, Message },
  data() {
    return {
      products: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
      icon_plus: "/img/plus.png",
      descricao: null,
      valoUnitario: null,
      msg: null,
      msg_modal: null,
      modal_type: null,
      search: "",
    };
  },
  methods: {
    async getProducts() {
      this.msg = "";
      try {
        const response = await api.get("/produtos");
        if (response.data) {
          this.products = response.data;
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },

    async deleteProduct(id) {
      this.msg = "";
      try {
        const response = await api.delete(`/produtos/${id}`);
        if (response.data) {
          this.msg = "Produto deletado com sucesso!";
          this.msg = "danger";
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.getProducts();
    },

    async createProduct(e) {
      e.preventDefault();

      if (!this.description) {
        this.msg_modal = "Campo DESCRIÇAO vazio";
        this.modal_type = "danger";
        return;
      }
      if (!this.valoUnitario) {
        this.msg_modal = "Campo VALOR vazio";
        this.modal_type = "danger";
        return;
      }

      this.msg_modal = "";
      this.modal_type = "";

      const data = {
        descricao: this.description,
        valoUnitario: parseFloat(this.valoUnitario),
      };

      const dataJson = JSON.stringify(data);

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await api.post("/produtos", dataJson, { headers });

        this.msg = "Produto cadastrado com sucesso!";

        setTimeout(() => (this.msg = ""), 3000);
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.name = "";
      this.date = "";
      this.cpf = "";

      this.isOpen = false;

      this.$router.go();
    },
  },
  computed: {
    filteredItems() {
      return this.products.filter((item) => {
        console.log(item);
        return (
          item.descricao.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style scoped>
main {
  align-items: center;
}

.search-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
  padding-right: 10px;
}

input {
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

.title-content {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

body {
  padding: 2em;
}

table.table {
  width: 100%;
}

.table th,
.table td {
  text-align: left;
  padding: 0.25em;
  width: 100%;
}

.table tr {
  display: flex;
  border-bottom: 1px solid rgb(193, 184, 184);
  padding: 10px 0;
}
td.edit-buttons {
  text-align: right;
}
button {
  border-radius: 3px;
  border: none;
  margin: 0 0.25em;
  transition: all 0.3s;
}

button:hover {
  box-shadow: 0 0 4px rgba(3, 3, 3, 0.8);
  opacity: 0.9;
}

button.edit {
  background: #6f9;
}
button.delete {
  background: #f69;
}

/* form */
#form-product {
  max-width: 400px;
  margin: 0 auto;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid var(--color-primary);
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

.submit-btn {
  background-color: var(--color-primary);
  color: #e7e6e2;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.cancel-btn {
  background-color: rgb(220, 214, 214);
  color: #3b3a39;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 10px auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: var(--color-primary-light);
  color: #222;
}
.cancel-btn:hover {
  background-color: var(--color-danger);
  color: rgb(241, 234, 234);
}
/* end form */

@media (max-width: 700px) {
  tr {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.5em 0;
    border: 1px solid rgba(3, 3, 3, 0.2);
  }
  td,
  th {
    flex: 1 1 150px;
    border: 0.5px solid rgba(3, 3, 3, 0.2);
  }
  td.edit-buttons,
  td.empty {
    flex: 1 0 90%;
    text-align: center;
  }
  #header-title {
    display: none;
  }
}

* {
  font-family: "futura";
}

@media (min-width: 700px) {
  .container {
    width: 60%;
  }
}
</style>
