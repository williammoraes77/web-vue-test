<template>
  <main>
    <section class="container">
      <h1>Pessoas</h1>

      <!-- <section class="videos">
        <div class="video" v-for="person in people" :key="person.id">
          <a href="" target="_blank">
            <div class="video-text">{{ person.nome }}</div>
            <div class="video-text">{{ person.cpf }}</div>
          </a>
        </div>
      </section> -->
      <!-- <tr class="header-title">
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Açoes</th>
        </tr> -->
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
            <Button title="Deletar" type="danger" :icon="icon_delete" />
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script>
import api from "@/services/api";
import Button from "@/components/Button.vue";

export default {
  name: "PeopleView",
  components: { Button },
  data() {
    return {
      people: [],
      icon_edit: "/img/edit.png",
      icon_delete: "/img/delete.png",
    };
  },
  mounted() {
    api.get("/pessoas").then((response) => {
      this.people = response.data;
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
