<template>
  <main>
    <section class="container">
      <div class="title-content">
        <h1>Pedidos</h1>

        <Button
          title="Adicionar pedido"
          type="primary"
          :icon="icon_plus"
          @click="isOpen = true"
        />
      </div>

      <dir class="search-content">
        <input
          type="text"
          v-model="search"
          placeholder="Pesquise pelo nome do cliente"
        />
      </dir>
      <Message :msg="msg" v-show="msg" :type="msg_type" />
      <div class="father">
        <div class="card" v-for="order in filteredItems" :key="order.id">
          <div class="title-content">
            <h2 class="order_id">#{{ order.id }}</h2>
            <div class="order_actions">
              <div class="button-content"></div>
              <div class="button-content">
                <Button
                  title="Deletar"
                  type="danger"
                  :icon="icon_delete"
                  @click="deleteOrder(order.id)"
                />
              </div>
            </div>
          </div>
          <div class="data-conntent">
            <h3>{{ order.cliente.nome }}</h3>
            <h3>{{ order.dataEmissao }}</h3>
          </div>
          <div class="items-conntent">
            <div class="item-card" v-for="item in order.itens" :key="item.id">
              <h3>{{ item.produto.descricao }}</h3>
              <h3 class="title-md">{{ item.quantidade }} x {{ item.valor }}</h3>
              <h3 class="title-lg">R${{ item.subtotal }}</h3>
            </div>
          </div>
          <div class="total-conntent">
            <h3 class="title-md">Valor Total</h3>

            <h3 class="title-lg">R$ {{ order.valorTotal.toFixed(2) }}</h3>
          </div>
        </div>
      </div>
    </section>
  </main>
  <Modal :open="isOpen" @close="isOpen = !isOpen" :closeBtn="true">
    <form id="form-product" method="POST" @submit="createOrder">
      <!-- <div class="input-container"> -->
      <div class="client-content">
        <label for="input_description">Selecione o cliente:</label>
        <select name="client" id="client" v-model="client" required>
          <option value="">Selecione o cliente</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.nome }}
          </option>
        </select>
      </div>
      <div id="products-container" class="input-container">
        <label id="products-title" for="opcionais"
          >Selecione os produtos:</label
        >
        <div
          class="checkbox-container"
          v-for="product in productsdata"
          :key="product.id"
        >
          <input
            type="checkbox"
            name="products"
            v-model="products"
            :value="product.id"
          />
          <span>{{ product.descricao }} (R${{ product.valoUnitario }})</span>
        </div>
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
  name: "OrdersView",
  components: { Button, Modal, Message },
  data() {
    return {
      orders: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
      icon_plus: "/img/plus.png",
      search: "",
      msg: null,
      msg_type: null,
      msg_modal: null,
      modal_type: null,
      client: null,
      client_id: null,
      clients: null,
      product: null,
      products: [],
      productsClient: [],
      productsdata: null,
    };
  },
  methods: {
    async getOrders() {
      this.msg = "";
      try {
        const response = await api.get("/pedidos");
        if (response.data) {
          this.orders = response.data;
        }
        const responsePeople = await api.get("/pessoas");
        if (responsePeople.data) {
          this.clients = responsePeople.data;
        }
        const responseProducts = await api.get("/produtos");
        if (responseProducts.data) {
          this.productsdata = responseProducts.data;
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
    async deleteOrder(id) {
      this.msg = "";
      try {
        const response = await api.delete(`/pedidos/${id}`);
        if (response.data) {
          this.msg = "Pedido deletado com sucesso!";
          this.msg = "success";
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.getOrders();
    },
    async createOrder(e) {
      e.preventDefault();

      const date = new Date();

      this.msg = "";

      if (this.products.length <= 0) {
        this.msg = "Nenhum produto selecionado!";
        this.msg_type = "danger";

        setTimeout(() => (this.msg = ""), 3000);

        this.isOpen = false;

        return;
      }

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let formatedDate = `${year}-${month}-${day}`;

      const clientSelectedData = await this.getPerson(this.client);

      let totalValue = 0;
      for (let i = 0; i < this.products.length; i++) {
        const result = await this.getProduct(this.products[i]);
        const obj = {
          id: i + 1,
          quantidade: 1,
          subtotal: 1 * result.valoUnitario,
          produto: {
            id: result.id,
            descricao: result.descricao,
          },
        };

        totalValue += obj.subtotal;

        this.productsClient.push(obj);
      }

      const data = {
        cliente: {
          id: clientSelectedData.id,
          nome: clientSelectedData.nome,
        },
        dataEmissao: formatedDate,
        valorTotal: totalValue,
        itens: this.productsClient,
      };

      const dataJson = JSON.stringify(data);

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const response = await api.post("/pedidos", dataJson, { headers });
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.$router.go();
    },
    async getPerson(id) {
      try {
        const response = await api.get(`/pessoas/${id}`);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
    async getProducts() {
      this.msg = "";
      try {
        const response = await api.get("/produtos");
        if (response.data) {
          this.productsdata = response.data;
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
    async getProduct(id) {
      try {
        const response = await api.get(`produtos/${id}`);

        return response.data;
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
  },
  computed: {
    filteredItems() {
      return this.orders.filter((item) => {
        return (
          item.cliente.nome.toLowerCase().indexOf(this.search.toLowerCase()) >
          -1
        );
      });
    },
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  mounted() {
    this.getOrders();
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
  padding-right: 20px;
}

input,
select {
  border-radius: 10px;
  border: 2px solid var(--color-primary);
  height: 40px;
  width: 30%;
  color: var(--color-primary);
  font-size: 18px;
}

.search-content input::placeholder {
  color: var(--color-primary-light);
  font-size: 18px;
}

#products-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#products-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
  align-items: center;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.father {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  flex: 1 1 300px;
  margin: 15px 5px;
  border: 2px solid var(--color-primary);
  padding: 10px;
  border-radius: 16px;
  max-width: 350px;
}

.title-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin: 10px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary-light);
  border-radius: 10px;
  padding: 10px;
}

.total-conntent {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-top: 2px solid var(--color-text-light);
}

.title-md {
  font-size: 28px;
  color: var(--color-text-light);
}
.title-lg {
  font-size: 28px;
  color: var(--color-success);
}

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

.client-content {
  margin: 30px 0;
}

.client-content select {
  margin-top: 30px;
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
}

@media (min-width: 700px) {
  .container {
    width: 60%;
  }
}
</style>
