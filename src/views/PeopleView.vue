<template>
  <main>
    <section class="container">
      <div class="title-content">
        <h1>Pessoas</h1>
        <Button
          title="Adicionar"
          type="primary"
          :icon="icon_plus"
          @click="isOpen = true"
        />
      </div>

      <table class="table">
        <tr id="header-title">
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Açoes</th>
        </tr>
        <tr v-for="person in people" :key="person.id">
          <td>{{ person.id }}</td>
          <td>{{ person.nome }}</td>
          <td>{{ person.cpf }}</td>
          <td>{{ person.dataNascimento }}</td>
          <td class="edit-buttons">
            <Button title="Editar" type="success" :icon="icon_edit" />
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
  </main>
  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <form id="form-person" method="POST" @submit="createPerson">
      <div class="input-container">
        <label for="name">Nome da pessoa:</label>
        <input
          type="text"
          id="input_name"
          name="name"
          v-model="name"
          placeholder="Digite o nome"
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
        />
      </div>
      <div class="input-container">
        <label for="date">Data de nascimento</label>
        <input type="date" id="input_date" name="date" v-model="date" />
      </div>

      <div class="input-container">
        <input class="submit-btn" type="submit" value="Cadastrar!" />
      </div>
    </form>
  </Modal>
</template>

<script>
import api from "@/services/api";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
  name: "PeopleView",
  components: { Button, Modal },
  data() {
    return {
      people: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
      icon_plus: "/img/plus.png",
      name: null,
      cpf: null,
      date: null,
    };
  },
  methods: {
    async getPeople() {
      api.get("/pessoas").then((response) => {
        this.people = response.data;
      });
    },

    async deletePerson(id) {
      const response = await api.delete(`/pessoas/${id}`);
      console.log(response);

      this.getPeople();
    },

    async createPerson(e) {
      e.preventDefault();

      const data = {
        nome: this.name,
        cpf: this.cpf,
        dataNascimento: this.date,
      };

      const dataJson = JSON.stringify(data);

      console.log(dataJson);

      // const req = await fetch("http://localhost:3000/pessoas", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: dataJson,
      // });

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await api.post("/pessoas", dataJson, { headers });

      // const res = await response.json();

      console.log(response);

      // this.msg = "Pedido realizado com sucesso!";

      // clear message
      // setTimeout(() => (this.msg = ""), 3000);

      // // limpar campos
      // this.nome = "";
      // this.carne = "";
      // this.pao = "";
      // this.opcionais = [];
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
  /* width: 100%; */
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
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
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
  /* box-model: border-box; */
  font-family: "futura";
}

@media (min-width: 700px) {
  .container {
    width: 60%;
  }
}
</style>
