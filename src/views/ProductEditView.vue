<template>
  <main>
    <div class="form-container">
      <h1>Editar produto</h1>
      <form id="form-person" method="PUT" @submit="updatePerson">
        <div class="input-container">
          <label for="name">Descriçao:</label>
          <input
            type="text"
            id="input_description"
            name="description"
            v-model="description"
            placeholder="Digite a descriçao"
            required
          />
        </div>
        <div class="input-container">
          <label for="input_value">Valor</label>
          <input
            type="number"
            step="0.01"
            min="0"
            id="input_value"
            name="valoUnitario"
            v-model="valoUnitario"
            placeholder="Digite o valor"
            required
          />
        </div>

        <Message :msg="msg" v-show="msg" :type="msg_type" />

        <div class="input-container">
          <input
            class="submit-btn"
            type="submit"
            value="Salvar"
            id="submit-button"
            @click="updatePerson()"
          />
          <router-link to="/produtos">
            <input class="cancel-btn" type="button" value="Cancelar" />
          </router-link>
        </div>
      </form>
    </div>
    <Modal :open="isOpen" @close="isOpen = !isOpen" :closeBtn="false">
      <div class="modal-contant">
        <h1 class="title-success">Salvo com sucesso!</h1>
        <router-link to="/produtos">
          <input class="submit-btn" type="submit" value="OK!" />
        </router-link>
      </div>
    </Modal>
  </main>
</template>

<script>
import api from "@/services/api.js";
import Modal from "@/components/Modal.vue";
import Message from "@/components/Message.vue";
import { ref } from "vue";

export default {
  name: "ProductEditView",
  data() {
    return {
      description: "",
      valoUnitario: "",
      msg: null,
      msg_type: null,
    };
  },
  components: { Modal, Message },
  methods: {
    async getProduct() {
      this.msg = "";
      try {
        const response = await api
          .get(`produtos/${this.$route.params.produto}`)
          .then((response) => {
            this.description = response.data.descricao;
            this.valoUnitario = response.data.valoUnitario;
          });
        // console.log(response);
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
    async updatePerson(e) {
      e.preventDefault();

      if (!this.description) {
        this.msg = "Campo DESCRIÇAO vazio";
        this.msg_type = "danger";
        return;
      }
      if (!this.valoUnitario) {
        this.msg = "Campo VALOR vazio";
        this.msg_type = "danger";
        return;
      }

      this.msg = "";
      this.msg_type = "";

      const data = {
        descricao: this.description,
        valoUnitario: parseFloat(this.valoUnitario),
      };

      const dataJson = JSON.stringify(data);

      const headers = {
        "Content-Type": "application/json",
      };

      this.msg = "";
      try {
        const response = await api.put(
          `/produtos/${this.$route.params.produto}`,
          dataJson,
          {
            headers,
          }
        );
        this.isOpen = true;
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.getProduct();
    },
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  created() {
    this.getProduct();
  },
};
</script>

<style scoped>
main {
  background-color: var(--color-background);
  align-items: center;
}

.form-container {
  margin-top: 40px;
}

#form-person {
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
input {
  border-radius: 10px;
  border: 2px solid var(--color-primary);
  height: 40px;
  color: var(--color-primary);
  font-size: 18px;
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
.modal-contant {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-success {
  color: var(--color-success);
}
</style>
