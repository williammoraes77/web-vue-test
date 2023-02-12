<template>
  <main>
    <div class="form-container">
      <h1>Editar</h1>
      <form id="form-person" method="PUT" @submit="updatePerson">
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
          <input
            class="submit-btn"
            type="submit"
            value="Salvar"
            @click="updatePerson()"
          />
          <router-link to="/pessoas">
            <input class="cancel-btn" type="button" value="Cancelar" />
          </router-link>
        </div>
      </form>
    </div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <router-link to="/pessoas">
        <input class="submit-btn" type="submit" value="OK!" />
      </router-link>
    </Modal>
  </main>
</template>

<script>
import api from "@/services/api.js";
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

export default {
  name: "PersonEdit",
  data() {
    return {
      name: "",
      date: "",
      cpf: "",
      id: "",
    };
  },
  components: { Modal },
  methods: {
    async getPerson() {
      await api
        .get(`pessoas/${this.$route.params.usuario}`)
        .then((response) => {
          this.name = response.data.nome;
          this.cpf = response.data.cpf;
          this.date = response.data.dataNascimento;
          this.id = response.data.id;
          console.log(response);
        });
    },
    async updatePerson(e) {
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

      const response = await api.put(
        `/pessoas/${this.$route.params.usuario}`,
        dataJson,
        {
          headers,
        }
      );
      // const response = await api.put(
      //   `/pessoas/${this.$route.params.usuario}`,
      //   `/pessoas/${this.id}`,
      //   dataJson
      // );

      // const res = await response.json();

      console.log(response);

      this.isOpen = true;

      // this.msg = "Pedido realizado com sucesso!";

      // // clear message
      // setTimeout(() => (this.msg = ""), 3000);

      // // limpar campos
      // this.name = "";
      // this.date = "";
      // this.cpf = "";
      this.getPerson();
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
  border-left: 4px solid #fcba03;
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
</style>
