<template>
  <main>
    <section class="container">
      <div class="title-content">
        <h1>Clientes</h1>

        <Button
          title="Adicionar"
          type="primary"
          :icon="icon_plus"
          @click="isOpen = true"
        />
      </div>
      <dir class="search-content">
        <input type="text" v-model="search" placeholder="Pesquise pelo nome" />
      </dir>

      <table class="table">
        <tr id="header-title">
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Açoes</th>
        </tr>
        <!-- <tr v-for="person in people" :key="person.id"> -->
        <tr v-for="person in filteredItems" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.nome }}</td>
          <td>{{ person.cpf }}</td>
          <td>{{ person.dataNascimento }}</td>
          <td class="edit-buttons">
            <router-link
              :to="{ name: 'person_edit', params: { usuario: person.id } }"
            >
              <Button title="Editar" type="success" :icon="icon_edit"
            /></router-link>

            <Button
              title="Deletar"
              type="danger"
              :icon="icon_delete"
              @click="deletePerson(person.id)"
            />
          </td>
        </tr>
      </table>
    </section>
    <Message :msg="msg" v-show="msg" :type="msg_type" />
  </main>
  <Modal :open="isOpen" @close="isOpen = !isOpen" :closeBtn="true">
    <form id="form-person" method="POST" @submit="createPerson">
      <div class="input-container">
        <label for="name">Nome da pessoa:</label>
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
          v-on:change="validateCpf"
          required
        />
      </div>

      <div class="input-container">
        <label for="date">Data de nascimento</label>
        <input type="date" id="input_date" name="date" v-model="date" />
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
  name: "PeopleView",
  components: { Button, Modal, Message },
  data() {
    return {
      people: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
      icon_plus: "/img/plus.png",
      name: null,
      cpf: null,
      date: null,
      msg: null,
      msg_modal: null,
      modal_type: null,
      search: "",
    };
  },
  methods: {
    async getPeople() {
      this.msg = "";
      try {
        const response = await api.get("/pessoas");
        if (response.data) {
          this.people = response.data;
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }
    },

    async deletePerson(id) {
      this.msg = "";
      try {
        const response = await api.delete(`/pessoas/${id}`);
        if (response.data) {
          this.msg = "Pessoa deletada com sucesso!";
          this.msg = "danger";
        }
      } catch (error) {
        this.msg = "erro com o servidor, tente novamente mais tarde";
        this.msg_type = "danger";
      }

      this.getPeople();
    },

    async createPerson(e) {
      e.preventDefault();

      if (!this.name) {
        this.msg_modal = "Campo NOME vazio";
        this.modal_type = "danger";
        return;
      }
      if (!this.cpf) {
        this.msg_modal = "Campo CPF vazio";
        this.modal_type = "danger";
        return;
      }
      if (!this.date) {
        this.msg_modal = "Campo DATA vazio";
        this.modal_type = "danger";
        return;
      }

      this.msg_modal = "";
      this.modal_type = "";

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

      try {
        const response = await api.post("/pessoas", dataJson, { headers });

        this.msg = "Pessoa cadastrada com sucesso!";

        // clear message
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
    validateCpf() {
      const result = this.validaCpf(this.cpf);
      const button1 = document.getElementById("submit-button");
      if (!result) {
        this.msg_modal = "CPF inválido";
        this.modal_type = "danger";

        button1.disabled = true;
      } else {
        this.msg_modal = "";
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
  computed: {
    filteredItems() {
      return this.people.filter((item) => {
        return item.nome.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  mounted() {
    this.getPeople();
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
