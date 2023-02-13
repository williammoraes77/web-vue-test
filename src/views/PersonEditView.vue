<template>
  <main>
    <div class="form-container">
      <h1>Editar</h1>
      <form id="form-person" method="PUT" @submit="updatePerson">
        <div class="input-container">
          <label for="name">Nome do cliente:</label>
          <input
            type="text"
            id="input_name"
            name="name"
            v-model="name"
            placeholder="Digite o nome"
            required
          />
        </div>
        <div class="input-container">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="input_cpf"
            name="cpf"
            v-model="cpf"
            placeholder="Digite o CPF"
            v-on:change="verifyCpf"
            required
          />
        </div>
        <div class="input-container">
          <label for="date">Data de nascimento</label>
          <input
            type="date"
            id="input_date"
            name="date"
            v-model="date"
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
          <router-link to="/pessoas">
            <input class="cancel-btn" type="button" value="Cancelar" />
          </router-link>
        </div>
      </form>
    </div>
    <Modal :open="isOpen" @close="isOpen = !isOpen" :closeBtn="false">
      <div class="modal-contant">
        <h1 class="title-success">Salvo com sucesso!</h1>
        <router-link to="/pessoas">
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
  name: "PersonEdit",
  data() {
    return {
      name: "",
      date: "",
      cpf: "",
      id: "",
      msg: null,
      msg_type: null,
    };
  },
  components: { Modal, Message },
  methods: {
    async getPerson() {
      this.msg = "";
      try {
        const response = await api
          .get(`pessoas/${this.$route.params.usuario}`)
          .then((response) => {
            this.name = response.data.nome;
            this.cpf = response.data.cpf;
            this.date = response.data.dataNascimento;
            this.id = response.data.id;
          });
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },
    async updatePerson(e) {
      e.preventDefault();

      if (!this.name) {
        this.msg = "Campo NOME vazio";
        this.msg_type = "danger";
        return;
      }
      if (!this.cpf) {
        this.msg = "Campo CPF vazio";
        this.msg_type = "danger";
        return;
      }
      if (!this.date) {
        this.msg = "Campo DATA vazio";
        this.msg_type = "danger";
        return;
      }

      this.msg = "";
      this.msg_type = "";

      var strCPF = String(this.cpf).replace(/[^\d]/g, "");

      const data = {
        nome: this.name,
        cpf: strCPF
          .match(/.{1,3}/g)
          .join(".")
          .replace(/\.(?=[^.]*$)/, "-"),
        dataNascimento: this.date,
      };

      const dataJson = JSON.stringify(data);

      const headers = {
        "Content-Type": "application/json",
      };

      this.msg = "";
      try {
        const response = await api.put(
          `/pessoas/${this.$route.params.usuario}`,
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

      this.getPerson();
    },
    verifyCpf() {
      const result = this.validaCpf(this.cpf);
      const button1 = document.getElementById("submit-button");
      if (!result) {
        this.msg = "CPF inválido";
        this.msg_type = "danger";

        button1.disabled = true;
      } else {
        this.msg = "";
        button1.disabled = false;
      }
    },

    validaCpf(cpf) {
      var Soma = 0;
      var Resto;

      var strCPF = String(cpf).replace(/[^\d]/g, "");

      if (strCPF.length !== 11) return false;

      if (
        [
          "00000000000",
          "11111111111",
          "22222222222",
          "33333333333",
          "44444444444",
          "55555555555",
          "66666666666",
          "77777777777",
          "88888888888",
          "99999999999",
        ].indexOf(strCPF) !== -1
      )
        return false;

      for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;

      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;

      for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;

      if (Resto != parseInt(strCPF.substring(10, 11))) return false;

      return true;
    },
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  created() {
    this.getPerson();
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
