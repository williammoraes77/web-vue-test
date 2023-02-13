import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PeopleView from "../views/People/PeopleView.vue";
import PersonEditView from "../views/People/PersonEditView.vue";
import OrdersView from "../views/Orders/OrdersView.vue";
import ProductsView from "../views/Products/ProductsView.vue";
import ProductEditView from "../views/Products/ProductEditView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/pessoas",
    component: PeopleView,
  },
  {
    path: "/pessoa/editar/:usuario",
    name: "person_edit",
    component: PersonEditView,
  },
  {
    path: "/pedidos",
    component: OrdersView,
  },
  {
    path: "/produtos",
    component: ProductsView,
  },
  {
    path: "/produtos/editar/:produto",
    name: "product_edit",
    component: ProductEditView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
