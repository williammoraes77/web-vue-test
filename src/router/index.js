import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PeopleView from "../views/PeopleView.vue";
import OrdersView from "../views/OrdersView.vue";

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
    path: "/orders",

    component: OrdersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
